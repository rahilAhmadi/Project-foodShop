<?php
session_start();
$username="null";
$password="null";
$connect=mysqli_connect('localhost', 'root', '', 'daspokht');
if (isset($_POST['input_user'])&& !empty($_POST['input_user'])&&
    isset($_POST['input_pass'])&& !empty($_POST['input_pass']))
{
    $username=$_POST['input_user'];
    $password=$_POST['input_pass'];




    $sql='select * from users where user_Name="'.$username.'" and user_Password="'.$password.'"';
    $query=mysqli_query($connect,$sql);
    $row=mysqli_fetch_array($query);
    mysqli_close($connect);
    if($row)
    {   $_SESSION['login']=true;
        $_SESSION['name']=$row['full_Name'];
        $_SESSION['username']=$row['user_Name'];

        echo'logined';
        header('location:order.php');

    }
    else
    {

        echo 'نام کاربری یا کلمه عبور یافت نشد';
    }


}
else
{ echo $username."+++".$password;
    echo 'نام کاربری یا رمز عبور وارد نشده است';
}

