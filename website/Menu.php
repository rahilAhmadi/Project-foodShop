<?php
// بررسی می‌کنیم که آیا session_start قبلاً فراخوانی شده یا نه
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// اگر کاربر از طریق URL پارامتر user رو ارسال کرده، در سشن ذخیره می‌کنیم
if (isset($_GET['user'])) {
    $_SESSION['username'] = $_GET['user'];
}
?>

<div class="menu">
    <div class="menuRight">
        <ul>
            <li class="logo"><a href="index.html"><img src="asset/icon/logo.png" alt="logo"></a></li>
            <li class="hover"><a href="index.html">خانه</a></li>
            <li class="hover"><a href="food.php">منو</a></li>
            <li class="hover"><a href="about_me.html">درباره ما</a></li>
            <li class="hover"><a href="contact_me.html">تماس با ما</a></li>
        </ul>
        <i class="fa fa-bars" id="bars"></i>
    </div>

    <div class="menuLeft">
        <ul>
            <li>
                <a href="shoppingCart.php">
                    <img src="asset/icon/card 1.png" alt="shopping-card">
                </a>
            </li>
            <li>
                <?php if (isset($_SESSION['login']) && $_SESSION['login'] === true): ?>
                    <!-- اگر کاربر لاگین کرده بود -->
                    <?php require_once 'SessionCheck.php'; ?>
                    <a href="logOut.php" class="buttonLogin btn_menu_a"><?php echo htmlspecialchars($_SESSION['name']); ?></a>
                    <a href="logOut.php" class="logoLogin btn_menu_a"><img src="asset/icon/user.png" alt="user"></a>
                <?php else: ?>
                    <!-- اگر کاربر لاگین نکرده بود -->
                    <a href="login.html" class="buttonLogin btn_menu_a">ورود/عضویت</a>
                    <a href="login.html" class="logoLogin btn_menu_a"><img src="asset/icon/user.png" alt="user"></a>
                <?php endif; ?>
            </li>
        </ul>
    </div>
</div>
