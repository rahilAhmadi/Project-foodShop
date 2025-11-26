<?php
$host = "localhost";
$user = "root";        // نام کاربری دیتابیس
$pass = "";            // رمز عبور (اگر داری وارد کن)
$dbname = "daspokht"; // نام دیتابیس پروژه شما

$conn = mysqli_connect($host, $user, $pass, $dbname);

if (!$conn) {
    die("خطا در اتصال به پایگاه داده: " . mysqli_connect_error());
}

mysqli_set_charset($conn, "utf8mb4");
