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
        echo "<script>
            window.location.href='login.html?msg=" . urlencode('خوش آمدید') . "&user=" . urlencode($row['full_Name']) . "';
        </script>";
    } else {
        echo "<script>
            window.location.href='login.html?msg=" . urlencode('نام کاربری یا کلمه عبور اشتباه است') . "';
        </script>";
    }
    
    
} else {
    echo "<script>
            alert('نام کاربری یا رمز عبور وارد نشده است');
            document.getElementById('loginForm').reset();
          </script>";
}

mysqli_close($connect);
?>
