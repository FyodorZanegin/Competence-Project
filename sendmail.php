<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setFrom('fyodor.zanegin@mail.ru', 'Компетентность в компетенциях');
$mail->addAddress('fyodor.zanegin.spam@mail.ru');
$mail->Subject = 'Отзыв на проверку';

$body = '<h1>Отзыв</h1>';

if(trim(!empty($_POST['named']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['named'].'</p>';
}

if(trim(!empty($_POST['surname']))){
    $body.='<p><strong>Фамилия:</strong> '.$_POST['surname'].'</p>';
}

if(trim(!empty($_POST['phone']))){
    $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
}

if(trim(!empty($_POST['work']))){
    $body.='<p><strong>Место работы:</strong> '.$_POST['work'].'</p>';
}

if (!empty($_FILES['image']['tmp_name'])) {
    $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
    if (copy($_FILES['image']['tmp_name'], $filePath)){
        $fileAttach = $filePath;
        $body.='<p><strong>Фото:</strong> &#128504;';
        $mail->addAttachment($fileAttach);
    }
}

if(trim(!empty($_POST['message']))){
    $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
}

$mail->Body = $body;

if(!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);



// MySQL


$firstName = $_POST['named'];
$lastName = $_POST['surname'];
$phoneNumber = $_POST['phone'];

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'sql__kk';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO reviewsform (firstName , lastName, phoneNumber)
VALUES ('$firstName', '$lastName', '$phoneNumber')";

if ($conn->query($sql) === TRUE) {
  exit;
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>