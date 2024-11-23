<?php
// Get data from form  
$name = $_POST['name'];
$email= $_POST['email'];
$message= $_POST['message'];

$to = "henryonastelie@gmail.com";
$subject = "Contact via portfolio";

// The following text will be sent
// Name = user entered name
// Email = user entered email
// Message = user entered message 
$txt ="Name = ". $name . "\r\n  Email = " 
    . $email . "\r\n Message =" . $message;

$headers = "From: "+$email;
if($email != NULL) {
    mail($to, $subject, $txt, $headers);
}

// Redirect to
header("Location:../../index.html");
?>