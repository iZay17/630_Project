<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$conn = new mysqli("localhost", "root", "", "shopping-app");



if(isset($_POST['email']) && !empty($_POST['email'])){

$loginid = $_POST['loginid'];
$first_name = $_POST['firstname'];
$last_name = $_POST['lastname'];
$email = $_POST['email'];
$password = $_POST['password'];
$password_hash = password_hash($_POST["password"], PASSWORD_DEFAULT);
$balance = 0;
$userid;

$sql = "SELECT * FROM `users`;";
$result = $conn -> query($sql);

if($result) {
    $myArray = array();
    while($row = $result->fetch_assoc()) {
        $myArray[] = $row;
    }
    $n = count($myArray) + 1;
    $userid = "U" . str_pad($n, 5, '0', STR_PAD_LEFT);
} else {
    $n = 1;
    $userid = "U" . str_pad($n, 5, '0', STR_PAD_LEFT);
} 


if(empty($_POST["firstname"]) || empty($_POST['lastname']))
{
    die("We require name");
} else if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)){
    die("This is not valid email");
} else {
    $sql2 = "INSERT INTO `users` (`user-id`, `first_name`, `last_name`, `phone`, `email`, `address`, `city-code`, `login-id`, `pass`, `balance`) VALUES('$userid','$first_name','$last_name', NULL,'$email', NULL, NULL,'$loginid','$password_hash', '$balance');";
    $res = $conn -> query($sql2);
    if($res){
        http_response_code(201);
        echo "registration successful";
    }
    else{
        echo "A user account with that email already exists";
    }
}

} else {
    die("no email provided");
}

?>
