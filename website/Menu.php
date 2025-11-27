<?php
session_start();
if (isset($_GET['user'])) {
    $_SESSION['username'] = $_GET['user'];
}

echo '  <div class="menu">
            <div class="menuRight">
                <ul>
                    <li class="logo"><a href="index.html"><img src="asset/icon/logo.png" alt="logo"></a>
                    </li>
                    <li class="hover"><a href="index.html">خانه</a></li>
                    <li class="hover"><a href="food.php">منوی سفارش</a></li>
                    <li class="hover"><a href="about_me.html">درباره ما</a></li>
                    <li class="hover"><a href="contact_me.html">تماس با ما</a></li>
                </ul>
                <i class="fa fa-bars" id="bars"></i>
            </div>';

if (isset($_SESSION['login'])&& $_SESSION['login']===true)

{

    require_once 'SessionCheck.php';

echo'       <div class="menuLeft">
                <ul>
                    <li><a href="shoppingCart.html"><img src="asset/icon/card 1.png" alt="shoping-card"></a></li>
                    <li>
                        <a href="logOut.php" class="buttonLogin btn_menu_a">'.$_SESSION['name'].'</a>
                        <a href="logOut.php" class="logoLogin btn_menu_a"><img src="asset/icon/user.png" alt="user"></a>
                    </li>
                </ul>
            </div>
        </div>';
}//end if
else
{

echo'       <div class="menuLeft">
                <ul>
                    <li>
                        <a href="login.html" class="buttonLogin btn_menu_a">ورود/عضویت</a>
                        <a href="login.html" class="logoLogin btn_menu_a"><img src="asset/icon/user.png" alt="user"></a>
                    </li>
                </ul>
            </div>
        </div>';

}

?>