<?php
require_once "db.php";

$orderId = intval($_POST['orderId']);
$status  = $_POST['status'];

$sql = "UPDATE orders 
        SET status = '$status' 
        WHERE order_ID = $orderId";

if (mysqli_query($conn, $sql)) {
    echo "success";
} else {
    echo "error";
}
