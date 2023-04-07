<?php

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    session_start();

    $conn = new mysqli("localhost", "root", "", "shopping-app");
    if ($_POST["current_page"] == "login"){
        if($_POST['email']) {
            $email = $_POST['email'];
            $password = $_POST['password'];

            $sql = "SELECT * FROM `users` WHERE `Email`='" . $email . "'";
            $res = $conn -> query($sql);

            if($res) {
                $row = $res->fetch_assoc();
                $salt = $row["Salt"];
                $decoded_salt = base64_decode($salt);
                $salted_password = trim($password) . trim($decoded_salt);
                $password_hash = md5($salted_password);
                if ($password_hash == $row["Pass"]){
                    echo json_encode($row);
                } else {
                    echo "Incorrect password!";
                }
            } else {
                echo "No user account uses the email provided";
            }

            
        } else {
            echo "Email not provided";
        }
    } else if($_POST["current_page"] == "register") {
        if(isset($_POST['email']) && !empty($_POST['email'])){

            $loginid = $_POST['loginid'];
            $first_name = $_POST['firstname'];
            $last_name = $_POST['lastname'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            $salt = random_bytes(60);
            $encoded_salt = base64_encode($salt);
            $salted_password = $password . $salt;
            $password_hash = md5($salted_password);
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
                $sql2 = "INSERT INTO `users` (`user-id`, `first_name`, `last_name`, `phone`, `email`, `address`, `city-code`, `loginid`, `pass`, `salt`, `balance`) VALUES('$userid','$first_name','$last_name', NULL,'$email', NULL, NULL,'$loginid','$password_hash', '$encoded_salt', '$balance');";
                $res = $conn -> query($sql2);
                if($res){
                    http_response_code(201);
                    echo "Registration Successful!";
                }
                else{
                    echo "A user account with that email already exists";
                }
            }
            
            } else {
                die("no email provided");
            }
    }


?>