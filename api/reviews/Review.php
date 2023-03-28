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
        case "POST":
            $review = $_POST['review'];
            $ratingService = $_POST['ratingService'];
            $ratingItem = $_POST['ratingItem'];
            $item = $_POST['item'] ;
            $service = $_POST['service'];
            $reviewDate = $_POST['reviewDate'];

            $sql = "SELECT * FROM `reviews`";
            $numberOfReviews = 0;
            $myArray = array();
            $result = $conn -> query($sql);
            if ($result){
                while($row = $result->fetch_assoc()) {
                    $numberOfReviews++;
                }
                $numberOfReviews = str_pad($numberOfReviews, 3, '0', STR_PAD_LEFT);
            } else {
                $numberOfReviews = 1;
                $numberOfReviews = str_pad($numberOfReviews, 3, '0', STR_PAD_LEFT);
            }
            
            

            $sql = "INSERT INTO `reviews` (`reviewid`,`userid`, `rnservice`, `rnitem`, `review`, `services`, `item`, `dateofrev`) VALUES('RE-$numberOfReviews','U00001','$ratingService', '$ratingItem', '$review', '$service', '$item', '$reviewDate');";

            if($res = $conn -> query($sql)){
                echo "Success";
            }
            else{
                echo "Error!" . mysqli_error($conn);
            }
            break;
        case "GET":
            $sql = "SELECT * FROM `reviews`";
            $myArray = array();
            $res = $conn -> query($sql);
            while($row = $res->fetch_assoc()) {
                $myArray[] = $row;
            }
            echo json_encode($myArray);
            break;
        }
    }



    $conn -> close();

?>