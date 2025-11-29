<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// بررسی لاگین کاربر
if (!isset($_SESSION["user_id"])) {
    // ⬅️ اگر لاگین نکرده بود، به صفحه لاگین منتقل می‌شود
    header("Location: login.html?redirect=dargah.php");
    exit();
}

// بررسی وجود اطلاعات سفارش
if (!isset($_SESSION["cart"]) || !isset($_SESSION["order_info"])) {
    // ⬅️ اگر سبد خرید یا اطلاعات سفارش نبود، به صفحه اصلی یا سبد خرید منتقل می‌شود
    header("Location: shoppingCart.php");
    exit();
}

// اتصال به دیتابیس
// ⚠️ اطلاعات اتصال را با مقادیر سرور خود (اگر متفاوت است) جایگزین کنید.
$db = new mysqli("localhost", "root", "", "daspokht"); 

// بررسی خطا در اتصال به دیتابیس
if ($db->connect_error) {
    die("خطا در اتصال به دیتابیس: " . $db->connect_error);
}

// ------------------------------------------------
// ۱. محاسبه مجموع قیمت سفارش (رفع اخطار خط ۲۴)
// ------------------------------------------------
$total_price = 0;
// ⬅️ از کلید "qty" استفاده می‌شود
foreach ($_SESSION["cart"] as $item) {
    // رفع اخطار Undefined array key "qty"
    $total_price += $item["price"] * $item["qty"]; 
}
// ⬅️ هزینه ارسال را از سشن می‌خوانیم
$total_price += $_SESSION["order_info"]["shipping_cost"];


// ------------------------------------------------
// ۲. ثبت سفارش در جدول orders
// ------------------------------------------------
$stmt = $db->prepare("INSERT INTO orders (user_ID, total_Price, status, created_At) VALUES (?, ?, 'confirmed', NOW())");

// $total_price را با نوع 'd' (double/float) به جای 'i' (integer) برای دقت بیشتر بگذارید
$stmt->bind_param("id", $_SESSION["user_id"], $total_price);
$stmt->execute();
$order_id = $stmt->insert_id; // شناسه سفارش تازه ثبت شده


// ------------------------------------------------
// ۳. ثبت آیتم‌های سفارش در جدول order_items (رفع خطای خط ۳۹)
// ------------------------------------------------
foreach ($_SESSION["cart"] as $item) {
    $stmt = $db->prepare("INSERT INTO order_items (order_ID, food_ID, quantity, price) VALUES (?, ?, ?, ?)");
    
    // ⬅️ رفع خطای Fatal error: Uncaught mysqli_sql_exception: Column 'food_ID' cannot be null
    // فرض: food_ID در سشن با کلید "food_id" ذخیره شده و ستون دیتابیس 'quantity' است.
    $stmt->bind_param("iiid", 
        $order_id, 
        $item["food_id"], // استفاده از کلید "food_id"
        $item["qty"],     // استفاده از کلید "qty"
        $item["price"]
    );
    $stmt->execute();
}


// ------------------------------------------------
// ۴. اتمام موفقیت‌آمیز سفارش
// ------------------------------------------------
// پاک کردن سشن‌های سبد خرید
unset($_SESSION["cart"]);
unset($_SESSION["order_info"]);

// ⬅️ انتقال به صفحه موفقیت سفارش
header("Location: order_success.php?order_id=" . $order_id);
exit();
?>