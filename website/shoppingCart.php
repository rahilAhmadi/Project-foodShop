<!DOCTYPE html>
<html lang="fa">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="css/shoppingCart.css">
    <title>سبد خرید</title>
</head>

<body>

<?php require ('Menu.php'); ?>
    <div class="cart-page">
        <h2>سبد خرید شما</h2>
        <div class="cart-items">
            <!-- محصولات از JS اضافه میشن -->
        </div>

        <div class="cart-summary">
            <h3 class="shop-box-text">خلاصه سفارش</h3>
            <div class="jamkol_txt">
                <p>جمع کل: <strong>0 تومان</strong></p>
            </div>
            <div class="discount-box">
                <input type="text" placeholder="کد تخفیف" class="discount-input" />
                <button class="apply-discount">اعمال تخفیف</button>
            </div>
            <a href="information.html">
                <button class="pay-btn">پرداخت</button>
            </a>
        </div>
    </div>

    <!-- اسکریپت جداگانه -->
    <script src="js/shoppingCart.js"></script>
</body>

</html>
