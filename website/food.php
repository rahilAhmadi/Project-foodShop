<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
require('Menu.php');

function show_food($type) {
    $connect = mysqli_connect('localhost', 'root', '', 'daspokht');
    $sql = 'SELECT * FROM `foods` WHERE available=1 AND `Type`=' . $type;
    $result = mysqli_query($connect, $sql);
    return $result;
}

$index = isset($_GET['index']) ? $_GET['index'] : 1;
?>

<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="user-logged-in" content="<?php echo isset($_SESSION['user_id']) ? 'true' : 'false'; ?>">
    <title>منوی سفارش</title>
    <link rel="shortcut icon" href="asset/icon/logo.png" type="image/x-icon">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="css/food.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <?php require ('Menu.php'); ?>
      
    <nav class="categories">
        <a href="food.php?index=1" data-category="irani">🔥 ایرانی</a>
        <a href="food.php?index=2" data-category="fastfood">🥪 فست فود</a>
        <a href="food.php?index=3" data-category="kabab">🍖 کباب</a>
        <a href="food.php?index=4" data-category="fried">🍟 سوخاری</a>
        <a href="food.php?index=5" data-category="noshidani">🥤 نوشیدنی</a>
    </nav>

    <div class="container">
        <section class="product-grid">
        <?php
$foods = show_food($index);
while ($row = mysqli_fetch_array($foods)) {
    // قیمت خام را به عنوان عدد صحیح می‌گیریم
    $price = intval($row['price']); 
    
    echo '
    <div class="product-card" data-category="irani">
        <div class="product-image-container">
            <img src="asset/img/FoodsImage/' . $row['img_url'] . '" alt="غذا">
        </div>
        <div class="product-info">
            <h3>' . $row['food_Name'] . '</h3>
            <p>' . $row['description'] . '</p>
            <span class="price" data-price="' . $price . '">' . $price . '</span>
            <button class="add-to-cart-btn" data-id="' . $row['food_ID'] . '">+</button>
        </div>
    </div>';
}
?>
</section>


        <aside class="cart-sidebar">
            <div class="cart-header">سبد خرید</div>
            <div class="cart-items"></div>
            <div class="cart-summary">
                <div class="summary-row">
                    <span>جمع کل:</span>
                    <span class="total-amount">0 تومان</span>
                </div>
            </div>
            <?php if (isset($_SESSION['user_id'])): ?>
                <button class="checkout-btn" id="checkout-btn">رفتن به سبد خرید</button>
            <?php else: ?>
                <button class="checkout-btn" id="login-btn">برای پرداخت وارد شوید</button>
            <?php endif; ?>
        </aside>
    </div>

    <div class="modal hidden">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <div class="modal-image-container">
                <img src="" alt="modal image" class="modal-img">
            </div>
            <div class="modal-body">
                <h2 id="modal-name"></h2>
                <p class="modal-desc"></p>
                <p class="modal-price"></p>
            </div>
            <div class="modal-footer">
                <div class="quantity-picker">
                    <button class="quantity-btn decrease">-</button>
                    <span class="quantity">1</span>
                    <button class="quantity-btn increase">+</button>
                </div>
                <?php if (isset($_SESSION['user_id'])): ?>
                    <button class="add-to-cart-modal-btn">افزودن به سبد خرید</button>
                <?php else: ?>
                    <button class="add-to-cart-modal-btn" id="login-modal-btn">برای افزودن وارد شوید</button>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <script src="js/food.js"></script>
</body>
</html>