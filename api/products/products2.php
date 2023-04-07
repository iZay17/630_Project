<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    session_start();


    $conn = new mysqli("localhost", "root", "", "shopping-app");

    if($conn -> connect_errno){
        echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
        exit();
    }
    else{
        $method = $_SERVER['REQUEST_METHOD'];
        $input = json_decode(file_get_contents('php://input'), true);
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
                case 'PUT':
                    if (isset($_GET['id'])) {
                      $id = intval($_GET['id']); 
                      $code = $input['code'];
                      $name = $input['name'];
                      $image = $input['image'];
                      $price = $input['price'];
                      $sql = "UPDATE `product` SET `price`='$price', `name`='$name', `code`='$code', `image`='$image' WHERE `id`='$id'";
                      $conn->query($sql);
                      if($res = $conn->query($sql2)) {
                        echo json_encode(array('message' => 'Product successfully updated'));
                    } else {
                        echo "Product could not be created(Check format)";
                    }
                    }
                    break;  
                case 'POST':
                    $code = $input['code'];
                    $name = $input['name'];
                    $image = $input['image'];
                    $price = $input['price'];
                    $sql = "SELECT * FROM `product`";
                    $numberOfProducts = 0;
                    $myArray = array();
                    $result = $conn -> query($sql);
                    if ($result){
                        while($row = $result->fetch_assoc()) {
                            $numberOfProducts++;
                        }
                    } else {
                        $numberOfProducts = 1;
                    }
                    $id = $numberOfProducts + 1; 
                    $sql2 = "INSERT INTO `product` (`id`, `name`, `code`, `image`, `price`) VALUES ('$id', '$name', '$code', '$image', '$price')";
                    if($res = $conn->query($sql2)) {
                        echo json_encode(array('message' => 'Product created successfully'));
                    } else {
                        echo "Product could not be created(Check format)";
                    }
                    break;
        }
    }
    $conn -> close();
?>