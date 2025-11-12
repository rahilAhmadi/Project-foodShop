<?php
$full_Name ="name";
$user_Name ="user";
$user_Password ="pass";
if(isset($_POST['input_name']) && !empty($_POST['input_name'])&&
    isset($_POST['input_user'])&& !empty($_POST['input_user'])&&
    isset($_POST['input_pass'])&& !empty($_POST['input_pass'])) 
  {
    $full_Name = $_POST['input_name'];
    $user_Name = $_POST['input_user'];
    $user_Password = $_POST['input_pass'];

    $check_Username=check_username_uniuqe($user_Name);
   
    if($check_Username)
    {
       echo "<script>
                alert('نام کاربری تکراری است');
                window.location.href='register.html';
              </script>";

    }
    else
    {
        add_user($full_Name,$user_Name,$user_Password);
        echo "<script>
                alert('ثبت‌نام موفق بود');
               window.location.href='login.html';
              </script>";
              // echo $full_Name."++++".$user_Name."++++".$user_Password."true";
     

    }
  }
else 
  {
        echo "<script>
                alert('خطایی رخ داد');
                window.location.href='register.html';
              </script>";
  }
    

mysqli_close($connect);



 
function check_username_uniuqe($user_Name)
{
  $countUsername=0;
  $connect = mysqli_connect('localhost', 'root', '', 'daspokht');
  $check="SELECT user_Name FROM users WHERE user_Name ='".$user_Name."'";
  // echo $check;
  $query = mysqli_query($connect, $check);
  while($row=mysqli_fetch_array($query))
  {
    $countUsername +=1;
  }
  if($countUsername>0)
  {
    return true;
  }
  else
  {
    return false;
  }
}

function add_user($full_Name,$user_Name,$user_Password)
{
  $connect = mysqli_connect('localhost', 'root', '', 'daspokht');
  $sql = 'insert into users (role_ID,full_Name,user_Name,user_Password) VALUES (2,"'.$full_Name.'","'.$user_Name.'","'.$user_Password.'")';
  $query = mysqli_query($connect, $sql);

}
?>