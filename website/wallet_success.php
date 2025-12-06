<?php
// wallet_success.php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// 1. بررسی لاگین کاربر
if (!isset($_SESSION["user_id"])) {
    header("Location: login.html");
    exit();
}

// 2. خواندن مبلغ شارژ شده و کد پیگیری از پارامتر URL
$amount = $_GET['amount'] ?? 0;

// ✅ FIX 1: تعریف متغیر $tracking_code با مقدار پیش‌فرض
$tracking_code = $_GET['tracking_code'] ?? 'N/A';

function formatPrice($num) {
    // تبدیل عدد به فرمت هزارگان فارسی
    $english = number_format($num);
    // این تابع عدد را به فارسی تبدیل کرده و " تومان" را برمی‌گرداند.
    return str_replace(range(0, 9), ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'], $english) . " تومان";
}

$formatted_amount = formatPrice($amount);

// 3. پاک کردن متغیرهای localStorage (اختیاری)
echo "<script>";
echo "localStorage.removeItem('payableAmount');";
echo "localStorage.removeItem('payType');";
echo "</script>";
?>

<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>شارژ موفق</title>
    <link rel="stylesheet" href="style.css">
   
</head>
<body>
<div class="success-container" style="text-align: center; margin-top: 50px;">
        <h1> شارژ کیف پول با موفقیت انجام شد!</h1>
        
        <p style="font-size: 1.2em; color: #4CAF50;">مبلغ شارژ شده: <strong><?php echo $formatted_amount; ?></strong></p>
        
        <?php if ($tracking_code !== 'N/A'): ?>
            <p style="font-size: 1.2em; color: #4CAF50;">کد پیگیری پرداخت: <strong><?php echo htmlspecialchars($tracking_code); ?></strong></p>
        <?php endif; ?>
        
        <p>اکنون موجودی شما برای خریدهای بعدی قابل استفاده است.</p>
        
        <a href="wallet.php" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">بازگشت به کیف پول</a>
        
        <a href="index.html" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #555; color: white; text-decoration: none; border-radius: 5px;">صفحه اصلی</a>
    </div>
    
    <script>
        // پاک کردن نهایی اطلاعات پرداخت از مرورگر
        localStorage.removeItem('payableAmount');
        localStorage.removeItem('payType');
    </script>
</body>
</html>