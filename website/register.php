<?php
$full_Name ="name";
$user_Name ="user";
$user_Password ="pass";
if(isset($_POST['input_name']) && !empty($_POST['input_name'])&&
    isset($_POST['input_user'])&& !empty($_POST['input_user'])&&
    isset($_POST['input_pass'])&& !empty($_POST['input_pass'])) {
    $full_Name = $_POST['input_name'];
    $user_Name = $_POST['input_user'];
    $user_Password = $_POST['input_pass'];
    $connect = mysqli_connect('localhost', 'root', '', 'daspokht');
    $sql = 'insert into users (role_ID,full_Name,user_Name,user_Password) VALUES (2,"'.$full_Name.'","'.$user_Name.'","'.$user_Password.'")';
    $query = mysqli_query($connect, $sql);
        echo "<script>
                alert('ثبت‌نام موفق بود');
                window.location.href='login.html';
              </script>";
              echo $full_Name."++++".$user_Name."++++".$user_Password."true";
    } else {
        echo "<script>
                alert('خطایی رخ داد');
                window.location.href='register.html';
              </script>";
    }

mysqli_close($connect);
?>