<?php
session_start();
$username = "";
$password = "";

$connect = mysqli_connect('localhost', 'root', '', 'daspokht');
if (!$connect) {
    die("خطا در اتصال به دیتابیس: " . mysqli_connect_error());
}

if (isset($_POST['input_user']) && !empty($_POST['input_user']) &&
    isset($_POST['input_pass']) && !empty($_POST['input_pass'])) {

    $username = $_POST['input_user'];
    $password = $_POST['input_pass'];

    $sql = 'SELECT * FROM users WHERE user_Name="'.$username.'" AND user_Password="'.$password.'"';
    $query = mysqli_query($connect, $sql);
    $row = mysqli_fetch_array($query);

    if ($row) {
        $_SESSION['login'] = true;
        $_SESSION['name'] = $row['full_Name'];
        $_SESSION['username'] = $row['user_Name'];
        $_SESSION['last_activity'] = time();

        // ورود موفق
        echo "<script>
                alert('ورود موفق');
                window.location.href='order.php'; // اگه میخوای به صفحه سفارش بری
              </script>";
    } else {
        // نام کاربری یا رمز اشتباه
        echo "<script>
                alert('نام کاربری یا کلمه عبور اشتباه است');
                window.location.href='login.html';
              </script>";
    }

} else {
    // فرم کامل پر نشده
    echo "<script>
            alert('نام کاربری یا رمز عبور وارد نشده است');
            document.getElementById('loginForm').reset();
          </script>";
}

mysqli_close($connect);
?>
