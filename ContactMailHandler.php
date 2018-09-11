<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
iconv_set_encoding("internal_encoding", "UTF-8");
date_default_timezone_set("Europe/Stockholm");

class MailHandler {

    const NEWLINE = "\r\n";
    const FROM = "Orbis Primus <noreply@orbisprimus.se>";
    const EMAIL_TO = "kontakt@orbisprimus.se";
    
    static $question, $contactName, $contactEmail, $receivedTime;

    /**
     * Handles requests to send contact emails to kontakt@orbisprimus.se.
     * Constructs and sends the email as well as a confirmation email to the contact person.
     */
    public static function HandleMail() {
        if (!isset($_POST["question"])) {
            return "FAILED: No data was recieved.";
        }

        # Set variables
        MailHandler::$question = trim($_POST["question"]);
        MailHandler::$contactName = trim($_POST["contactName"]);
        MailHandler::$contactEmail = trim($_POST["contactEmail"]);
        MailHandler::$receivedTime = date("H:i:s Y-m-d");
        
        $wasSent = false;

        # Send email to kontakt@orbisprimus.se
        try {
            MailHandler::SendContactMessage();
            $wasSent = true;
        } catch(Exception $e) {
            # Pass, no error handling for now..
        } finally {
            if (!$wasSent) {
                return "ERROR: Contact email was not sent.";
            }
        }

        # Send confirmation email to contact person
        try {
            MailHandler::SendConfirmationMessage();
        } catch(Exception $e) {
            return "ERROR: Contact email was sent but not the confirmation email to sender.";
        }

        return "SUCCESS";
   }

    private static function BuildContactMessage() {
        return "Fråga:" . MailHandler::NEWLINE
        . "-----------------------------" . MailHandler::NEWLINE
        . MailHandler::$question . MailHandler::NEWLINE . MailHandler::NEWLINE
        . "Namn kontaktperson: " . MailHandler::$contactName . MailHandler::NEWLINE
        . "E-postadress kontaktperson: " . MailHandler::$contactEmail . MailHandler::NEWLINE
        . "-----------------------------" . MailHandler::NEWLINE
        . "Meddelandet mottogs kl " . MailHandler::$receivedTime . MailHandler::NEWLINE
        . "Meddelandet skickades via frågeformuläret. [Server id: " . $_SERVER["SERVER_NAME"] . "]" . MailHandler::NEWLINE
        . "-----------------------------";
    }

    /**
     * Sends contact message to kontakt@orbisprimus.se
     */
    private static function SendContactMessage() {
        $subject = "Meddelande skickat via frågeformuläret på orbisprimus.se";
        
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
        $responseMessage = "Detta är en autogenerad bekräftelse på att er fråga till oss i Orbis Primus har skickats."
        . MailHandler::NEWLINE . "Tack för er fråga, vi återkommer med ett svar så fort vi kan!";

        return $responseMessage . MailHandler::NEWLINE
            . MailHandler::NEWLINE
            . "------- Mottaget meddelande -------" . MailHandler::NEWLINE
            . MailHandler::$question . MailHandler::NEWLINE . MailHandler::NEWLINE
            . "Namn kontaktperson: " . MailHandler::$contactName . MailHandler::NEWLINE
            . "E-postadress kontaktperson: " . MailHandler::$contactEmail . MailHandler::NEWLINE
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