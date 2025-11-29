<?php
session_start();

if (!isset($_SESSION["user_id"])) {
    http_response_code(401);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // ... (ذخیره order_info)
    $_SESSION["order_info"] = [
        "first_name" => $_POST["first_name"] ?? null,
        "last_name" => $_POST["last_name"] ?? null,
        "city" => $_POST["city"] ?? null,
        "address" => $_POST["address"] ?? null,
        "shipping_cost" => 25000, 
    ];
    
    $cart_data_json = $_POST['cart_data'] ?? null;
    $cart_items = json_decode($cart_data_json, true);
    
    $_SESSION['cart'] = [];
    if (!empty($cart_items) && is_array($cart_items)) {
        foreach ($cart_items as $item) {
            
            // ⬅️ اصلاح ۱: نام کلیدها را برای هماهنگی با process_payment.php تنظیم کنید
            // فرض می‌کنیم در جاوا اسکریپت کلیدها 'id' و 'qty' هستند.
            $food_id = $item['id'] ?? null; 
            $price = $item['price'] ?? 0;
            $quantity = $item['qty'] ?? 0; // استفاده از 'qty'

            if ($food_id) {
                $_SESSION['cart'][] = [
                    "food_id" => $food_id,  // ⬅️ کلید food_id برای خطای ۳۹
                    "qty" => $quantity,     // ⬅️ کلید qty برای اخطار خط ۲۴ در process_payment.php
                    "price" => $price,
                ];
            }
        }
    }

    http_response_code(200); 
    exit(); 
}

http_response_code(405); 
?>