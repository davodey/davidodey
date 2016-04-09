<?php

include 'config.php';
	error_reporting (E_ALL ^ E_NOTICE);
	$post = (!empty($_POST)) ? true : false;

if($post)
	{
		include 'functions.php';
		$subject = "davidodey.com message";
		$honey = $_POST['honey'];
        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];
		$error = '';

if($honey)
	{
		$error .= 'Go Away Robot<br />';
	}
if(!$error)
	{
		$mail = mail(WEBMASTER_EMAIL, $subject, $message,
     		"From: ".$firstname." <".$email.">\r\n"
    		."Reply-To: ".$email."\r\n"
			."X-Mailer: PHP/" . phpversion());
if($mail)
	{
		echo 'OK';
	}
}
else
	{
		echo '<div class="notification_error">'.$error.'</div>';
	}
}
?>