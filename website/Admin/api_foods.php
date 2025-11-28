<?php
// food.php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
require_once 'FoodManager.php';

$action = $_REQUEST['action'] ?? '';

if ($action === 'list') {
    $type = $_GET['type'] ?? '';
    if ($type === '') {
        echo json_encode(['status'=>'error','message'=>'type missing']);
        exit;
    }
    $result = Show_foods($type);
    if ($result === false) {
        echo json_encode(['status'=>'error','message'=>'db query failed']);
        exit;
    }
    $foods = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $foods[] = $row;
    }
    echo json_encode(['status' => 'success', 'foods' => $foods]);
    exit;
}

if ($action === 'delete') {
    // POST خوانده می‌شود (کدنویسی JS باید application/x-www-form-urlencoded یا form-data ارسال کند)
    $id = $_POST['id'] ?? 0;
    $id = intval($id);
    if ($id <= 0) {
        echo json_encode(['status'=>'error','message'=>'ID missing or invalid']);
        exit;
    }
    $ok = Delete_food($id);
    echo json_encode(['status' => $ok ? 'success' : 'error']);
    exit;
}

if ($action === 'toggleAvailable') {
    $id = intval($_POST['id'] ?? 0);
    $status = intval($_POST['status'] ?? 0);
    if ($id <= 0) {
        echo json_encode(['status'=>'error','message'=>'ID missing or invalid']);
        exit;
    }
    $ok = Avalible_food($id, $status);
    echo json_encode(['status' => $ok ? 'success' : 'error']);
    exit;
}

echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
