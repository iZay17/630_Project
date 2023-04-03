<?php

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    session_start();

    $conn = new mysqli("localhost", "root", "", "shopping-app");

    if($_POST['email']) {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $sql = "SELECT * FROM `users` WHERE `Email`='" . $email . "'";
        $res = $conn -> query($sql);

        if($res) {
            $row = $res->fetch_assoc();
            if (password_verify($password, $row["Pass"]) == true){
                echo json_encode($row);
            } else {
                echo "Password is incorrect";
            }
        } else {
            echo "No user account uses the email provided";
        }

        
    } else {
        echo "Email not provided";
    }



?>