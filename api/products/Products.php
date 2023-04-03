<?php
    header('Access-Control-Allow-Origin: *');
    session_start();

    $conn = new mysqli("localhost", "root", "", "shopping-app");
    if($conn -> connect_errno){
        echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
        exit();
    }
    else{
        $method = $_SERVER['REQUEST_METHOD'];
        switch($method) {
            case "GET": 
                if(isset($_GET['key'])) {
                    $sql = "SELECT * FROM `product` WHERE code='" . $_GET['key'] . "'";
                    $result = $conn -> query($sql);
                    $myArray = array();
                    while($row = $result->fetch_assoc()){
                        $myArray[] = $row;
                    }
                    echo json_encode($myArray);
                } else{
                    $sql = "SELECT * FROM `product`";
                    $result = $conn -> query($sql);
                    $myArray = array();
                    while ($row = $result->fetch_assoc()){
                        $myArray[] = $row;
                    }
                    echo json_encode($myArray);
                }
                break;
               
        }
    }
    $conn -> close();
?>