<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
iconv_set_encoding("internal_encoding", "UTF-8");
date_default_timezone_set("Europe/Stockholm");

class MailHandler {

    const NEWLINE = "\r\n";
    const FROM = "Orbis Primus <noreply@orbisprimus.se>";
    const EMAIL_TO = "bokning@orbisprimus.se";

    static $eventDescription, $location, $eventDate, $contactName, $contactEmail, $otherInfo, $receivedTime;

    /**
     * Handles requests to send booking emails to bokning@orbisprimus.se.
     * Constructs and sends the email as well as a confirmation email to the contact person.
     */
    public static function HandleMail() {
        if (!isset($_POST["eventDescription"])) {
            return "FAILED: No data was recieved.";
        }

        # Set variables
        MailHandler::$eventDescription = trim($_POST["eventDescription"]);
        MailHandler::$location = trim($_POST["location"]);
        MailHandler::$eventDate = trim($_POST["eventDate"]);
        MailHandler::$contactName = trim($_POST["contactName"]);
        MailHandler::$contactEmail =  trim($_POST["contactEmail"]);
        MailHandler::$otherInfo = trim($_POST["otherInfo"]);
        MailHandler::$receivedTime = date("H:i:s Y-m-d");
        
        $wasSent = false;

        # Send email to bokning@orbisprimus.se
        try {
            MailHandler::SendContactMessage();
            $wasSent = true;
        } catch(Exception $e) {
            # Pass, no error handling for now..
        } finally {
            if (!$wasSent) {
                return "ERROR: The booking request email was not sent.";
            }
        }

        # Send confirmation email to contact person
        try {
            MailHandler::SendConfirmationMessage();
        } catch(Exception $e) {
            return "ERROR: Booking request email was sent but not the confirmation email to sender.";
        }

        return "SUCCESS";
   }

    private static function BuildContactMessage() {
        return "Bokningsförfrågan:" . MailHandler::NEWLINE
        . "-----------------------------" . MailHandler::NEWLINE
        . "Evenemangsbeskrivning: " . MailHandler::$eventDescription . MailHandler::NEWLINE
        . "Plats: " . MailHandler::$location . MailHandler::NEWLINE
        . "Datum: " . MailHandler::$eventDate
        . "Namn kontaktperson: " . MailHandler::$contactName . MailHandler::NEWLINE
        . "E-postadress kontaktperson: " . MailHandler::$contactEmail . MailHandler::NEWLINE
        . "Övrig information: " . MailHandler::$otherInfo . MailHandler::NEWLINE
        . "-----------------------------" . MailHandler::NEWLINE
        . "Meddelandet mottogs kl " . MailHandler::$receivedTime . MailHandler::NEWLINE
        . "Meddelandet skickades via bokningsformuläret. [Server id: " . $_SERVER["SERVER_NAME"] . "]" . MailHandler::NEWLINE
        . "-----------------------------";
    }

    /**
     * Sends contact message to kontakt@orbisprimus.se
     */
    private static function SendContactMessage() {
        $subject = "Meddelande skickat via bokningsformuläret på orbisprimus.se";
        
        $headers = array();
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-Type: text/plain; charset=UTF-8";
        $headers[] = "From: " . MailHandler::FROM;
        $headers[] = "Reply-To: " . MailHandler::$contactName . " <" . MailHandler::$contactEmail . ">";
        $headers[] = "X-Mailer: PHP/".phpversion();
        
        mail(MailHandler::EMAIL_TO, '=?UTF-8?B?'.base64_encode($subject).'?=',
        MailHandler::BuildContactMessage(), implode(MailHandler::NEWLINE, $headers));
    }

    private static function BuildConfirmationMessage() {
        $responseMessage = "Detta är en autogenerad bekräftelse på att er Bokningsförfrågan till oss i Orbis Primus har skickats."
        . MailHandler::NEWLINE . "Tack för er förfrågan, vi återkommer med ett svar så fort vi kan!";

        return $responseMessage . MailHandler::NEWLINE
            . MailHandler::NEWLINE
            . "------- Mottaget meddelande -------" . MailHandler::NEWLINE
            . "Evenemangsbeskrivning: " . MailHandler::$eventDescription . MailHandler::NEWLINE
            . "Plats: " . MailHandler::$location . MailHandler::NEWLINE
            . "Datum: " . MailHandler::$eventDate
            . "Namn kontaktperson: " . MailHandler::$contactName . MailHandler::NEWLINE
            . "E-postadress kontaktperson: " . MailHandler::$contactEmail . MailHandler::NEWLINE
            . "Övrig information: " . MailHandler::$otherInfo . MailHandler::NEWLINE
            . "-----------------------------" . MailHandler::NEWLINE
            . "Meddelandet mottogs kl " . MailHandler::$receivedTime . MailHandler::NEWLINE;
    }
    
    /**
     * Sends a confirmation email to the sender
     */
    private static function SendConfirmationMessage() {
        $confirmationSubject = "Ditt meddelande har skickats till Orbis Primus";
        
        $headers = array();
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-Type: text/plain; charset=UTF-8";
        $headers[] = "From: " . MailHandler::FROM;
        $headers[] = "Reply-To: <>";
        $headers[] = "X-Mailer: PHP/".phpversion();
        
        mail(MailHandler::$contactEmail, $confirmationSubject,
        MailHandler::BuildConfirmationMessage(), implode(MailHandler::NEWLINE, $headers));
    }
}

echo MailHandler::HandleMail();

?>
