<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/Exception.php';
  require 'phpmailer/PHPMailer.php';
  require 'phpmailer/SMTP.php';

  $mail = new PHPMailer;
  $mail->CharSet = 'UTF-8';
  
  $name = $_POST['Name'];
  $email = $_POST['Email'];
  $message = $_POST['Message'];

  $mail->isSMTP();
  $mail->Host = 'mail19.mydevil.net';
  $mail->Port = 465;
  $mail->SMTPAuth = true;
  $mail->Username = 'wkosla@wkosla.usermd.net';
  $mail->Password = '77TAsakow';
  $mail->SMTPSecure = 'ssl';

  $mail->From = 'wkosla@wkosla.usermd.net';
  $mail->FromName = 'Portfolio contact form';

  $mail->addReplyTo($email, $name);
  $mail->addAddress('w.kosla@gmail.com');
  $mail->isHTML(true);

  $mail->Subject = 'New message from ' . $name;
  $mail->Body = "<span style='font-size: 0.7em'>From:</span><br>$name<br><span style='font-size: 0.7em'>E-mail:</span><br>$email<br><br><span style='font-size: 0.7em'>Message:</span><br>$message";

  if (!$mail->send()) {
    echo 'Message could not be sent. Reason: ' . $mail->ErrorInfo;
  } else {
    echo 'Message sent!';
  }
?>
