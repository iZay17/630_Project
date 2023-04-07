<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
$conn = new mysqli("localhost", "root", "", "shopping-app");


$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
  case 'GET':
    if (isset($_GET['id'])) {
      $id = intval($_GET['id']);
      $sql = "SELECT * FROM `orders` WHERE `order_id`='$id'";
    } else {
      $sql = "SELECT * FROM `orders`";
    }
    $result = $conn->query($sql);
    $output = array();
    while($row = $result->fetch_assoc()) {
      $output[] = $row;
    }
    echo json_encode($output);
    break;

  case 'POST':
    $sql = "SELECT * FROM `orders`";
    $numberOfOrders = 0;
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
      $numberOfOrders += 1;
    }
    $order_number = 'O' . str_pad($numberOfOrders + 1, 3, '0', STR_PAD_LEFT);
    $dateissued = $input["date_issued"];
    $paymentcode = $input["paymentcode"];
    $sql = "SELECT * FROM `users` WHERE  `Email`='" . $input["user"] . "'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $uid = $row["User-Id"];
    $product_id = $input['product_id'];
    $quantity = $input['quantity'];
    $total_price = $input['total_price'];
    $sql = "INSERT INTO `orders` (`order_id`, `date_issued`, `total_price`, `payment code`, `user_id`, `trip_id`, `product_id`, `quantity`) VALUES ('$order_number', '$dateissued', '$total_price', '$paymentcode', '$uid', '$product_id', '$quantity')";
    $conn->query($sql);
    echo json_encode(array('message' => 'Order created successfully'));
    break;

  case 'PUT':
    if (isset($_GET['id'])) {
      $id = intval($_GET['id']);
      $order_number = $input['order_number'];
      $product_id = $input['product_id'];
      $quantity = $input['quantity'];
      $total_price = $input['total_price'];
      $sql = "UPDATE `orders` SET `order_id`='$order_number', `product_id`='$product_id', `quantity`='$quantity', `total_price`='$total_price' WHERE `order_id`='$id'";
      $conn->query($sql);
      echo json_encode(array('message' => 'Order updated successfully'));
    }
    break;

  case 'DELETE':
    if (isset($_GET['id'])) {
      $id = intval($_GET['id']);
      $sql = "DELETE FROM `orders` WHERE `order_id`='$id'";
      $conn->query($sql);
      echo json_encode(array('message' => 'Order deleted successfully'));
    }
    break;
}

$conn->close();
?>