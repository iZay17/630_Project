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
    if (isset($_GET['ReviewId'])) {
      $ReviewId = $_GET['ReviewId'];
      $sql = "SELECT * FROM reviews WHERE ReviewId='$ReviewId'";
    } else {
      $sql = "SELECT * FROM reviews";
    }
    $result = $conn->query($sql);
    $output = array();
    while($row = $result->fetch_assoc()) {
      $output[] = $row;
    }
    echo json_encode($output);
    break;

  case 'POST':
    $ReviewId = $input['ReviewId'];
    $UserId = $input['UserId'];
    $RNService = $input['RNService'];
    $RNItem = $input['RNItem'];
    $Review = $input['Review'];
    $Services = $input['Services'];
    $Item = $input['Item'];
    $dateofrev = $input['dateofrev'];
    $sql = "INSERT INTO reviews (ReviewId, UserId, RNService, RNItem, Review, Services, Item, dateofrev) VALUES ('$ReviewId', '$UserId', $RNService, $RNItem, '$Review', '$Services', '$Item', '$dateofrev')";
    $conn->query($sql);
    echo json_encode(array('message' => 'Review created successfully'));
    break;

  case 'PUT':
    if (isset($_GET['ReviewId'])) {
      $ReviewId = $_GET['ReviewId'];
      $UserId = $input['UserId'];
      $RNService = $input['RNService'];
      $RNItem = $input['RNItem'];
      $Review = $input['Review'];
      $Services = $input['Services'];
      $Item = $input['Item'];
      $dateofrev = $input['dateofrev'];
      $sql = "UPDATE reviews SET UserId='$UserId', RNService=$RNService, RNItem=$RNItem, Review='$Review', Services='$Services', Item='$Item', dateofrev='$dateofrev' WHERE ReviewId='$ReviewId'";
      $conn->query($sql);
      echo json_encode(array('message' => 'Review updated successfully'));
    }
    break;

  case 'DELETE':
    if (isset($_GET['ReviewId'])) {
      $ReviewId = $_GET['ReviewId'];
      $sql = "DELETE FROM reviews WHERE ReviewId='$ReviewId'";
      $conn->query($sql);
      echo json_encode(array('message' => 'Review deleted successfully'));
    }
    break;
}

$conn->close();

?>