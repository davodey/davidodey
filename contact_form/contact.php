<?php

include 'config.php';
	error_reporting (E_ALL ^ E_NOTICE);
	$post = (!empty($_POST)) ? true : false;

if($post)
	{
		include 'functions.php';
		$honey = $_POST['honey'];
		$name = stripslashes($_POST['name']);
		$email = trim($_POST['email']);
		$message = stripslashes($_POST['message']);

		$error = '';

if($honey)
	{
		$error .= 'Go Away Robot<br />';
	}
// Check name
if(!$name)
	{
		$error .= 'Enter your name<br />';
	}
// Check email
if(!$email)
	{
		$error .= 'Enter your email address<br />';
	}
if($email && !ValidateEmail($email))
	{
		$error .= 'Invalid E-mail address.<br />';
	}
if(!$error)
	{
		$mail = mail(WEBMASTER_EMAIL, $subject, $message,
     		"From: ".$name." <".$email.">\r\n"
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