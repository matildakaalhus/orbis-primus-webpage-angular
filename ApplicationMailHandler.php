<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
iconv_set_encoding("internal_encoding", "UTF-8");
date_default_timezone_set("Europe/Stockholm");

class MailHandler {

    const NEWLINE = "\r\n";
    const FROM = "Orbis Primus <noreply@orbisprimus.se>";
    const EMAIL_TO = "kontakt@orbisprimus.se";

    static $name, $education, $email, $interests, $engagements, $experience, $instruments, $comfortable, $rhyme, $other, $receivedTime;

    /**
     * Handles requests to send application emails to ordforande@orbisprimus.se.
     * Constructs and sends the email as well as a confirmation email to the applicant.
     */
    public static function HandleMail() {
        if (!isset($_POST["name"])) {
            return "FAILED: No data was recieved.";
        }

        # Set variables
        MailHandler::$name = trim($_POST["name"]);
        MailHandler::$education = trim($_POST["education"]);
        MailHandler::$email = trim($_POST["email"]);
        MailHandler::$interests = trim($_POST["interests"]);
        MailHandler::$engagements =  trim($_POST["engagements"]);
        MailHandler::$experience = trim($_POST["experience"]);
        MailHandler::$instruments = trim($_POST["instruments"]);
        MailHandler::$comfortable = trim($_POST["comfortable"]);
        MailHandler::$rhyme = trim($_POST["rhyme"]);
        MailHandler::$other = trim($_POST["other"]);
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
                return "ERROR: The application email was not sent.";
            }
        }

        # Send confirmation email to applicant
        try {
            MailHandler::SendConfirmationMessage();
        } catch(Exception $e) {
            return "ERROR: Application email was sent but not the confirmation email to sender.";
        }

        return "SUCCESS";
   }

    private static function BuildContactMessage() {
        return "Ansökan:" . MailHandler::NEWLINE
        . "-----------------------------" . MailHandler::NEWLINE
        . "Namn: " . MailHandler::$name . MailHandler::NEWLINE
        . "Utbildning: " . MailHandler::$education . MailHandler::NEWLINE
        . "E-post: " . MailHandler::$email . MailHandler::NEWLINE
        . "Intressen: " . MailHandler::$interests . MailHandler::NEWLINE
        . "Andra åtaganden: " . MailHandler::$engagements . MailHandler::NEWLINE
        . "Erfarenhet: " . MailHandler::$experience . MailHandler::NEWLINE
        . "Instrument: " . MailHandler::$instruments . MailHandler::NEWLINE
        . "Bekväm på scen: " . MailHandler::$comfortable . MailHandler::NEWLINE
        . "Bästa rim: " . MailHandler::$rhyme . MailHandler::NEWLINE
        . "Annan information: " . MailHandler::$other . MailHandler::NEWLINE
        . "-----------------------------" . MailHandler::NEWLINE
        . "Meddelandet mottogs kl " . MailHandler::$receivedTime . MailHandler::NEWLINE
        . "Meddelandet skickades via ansökningsformuläret. [Server id: " . $_SERVER["SERVER_NAME"] . "]" . MailHandler::NEWLINE
        . "-----------------------------";
    }

    /**
     * Sends contact message to kontakt@orbisprimus.se
     */
    private static function SendContactMessage() {
        $subject = "Meddelande skickat via ansökningsformuläret på orbisprimus.se";
        
        $headers = array();
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-Type: text/plain; charset=UTF-8";
        $headers[] = "From: " . MailHandler::FROM;
        $headers[] = "Reply-To: " . MailHandler::$name . " <" . MailHandler::$email . ">";
        $headers[] = "X-Mailer: PHP/".phpversion();
        
        mail(MailHandler::EMAIL_TO, '=?UTF-8?B?'.base64_encode($subject).'?=',
        MailHandler::BuildContactMessage(), implode(MailHandler::NEWLINE, $headers));
    }

    private static function BuildConfirmationMessage() {
        $responseMessage = "Detta är en autogenererad bekräftelse på att din ansökan till oss i Orbis Primus har skickats."
        . MailHandler::NEWLINE . MailHandler::NEWLINE . "Tack för din ansökan, vi svarar så fort vi kan!";
        return $responseMessage . MailHandler::NEWLINE
            . "-----------------------------" . MailHandler::NEWLINE
            . "Ansökan mottogs kl " . MailHandler::$receivedTime . MailHandler::NEWLINE;
    }
    
    /**
     * Sends a confirmation email to the sender
     */
    private static function SendConfirmationMessage() {
        $confirmationSubject = "Din ansökan har skickats till Orbis Primus";
        
        $headers = array();
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-Type: text/plain; charset=UTF-8";
        $headers[] = "From: " . MailHandler::FROM;
        $headers[] = "Reply-To: <>";
        $headers[] = "X-Mailer: PHP/".phpversion();
        
        mail(MailHandler::$email, $confirmationSubject,
        MailHandler::BuildConfirmationMessage(), implode(MailHandler::NEWLINE, $headers));
    }
}

echo MailHandler::HandleMail();

?>
