<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8"> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>منوی غذا</title>
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

    <!-- Container اصلی -->
    <div class="container">
        <!-- محصولات --> 

        <section class="product-grid">
            <?php
            $index=$_GET['index'];
            $foods=show_food($index);
            while($row=mysqli_fetch_array($foods))
                 {
                    echo'
                    <div class="product-card" data-category="irani">
                            <div class="product-image-container">
                                <img src="asset/img/FoodsImage/'.$row['img_url'].'" alt="مرغ">
                            </div>
                            <div class="product-info">
                                <h3> '.$row['food_Name'].'</h3>
                                <p>'.$row['description'].'</p>
                                <span class="price">'.$row['price'].'</span>
                                <button class="add-to-cart-btn">+</button>
                            </div>
                        </div>
                    ';
            }
        ?>
            <!-- <div class="product-card" data-category="fastfood">
                <div class="product-image-container">
                    <img src="asset/img/fastfood1.jpg" alt="ساندویچ">
                </div>
                <div class="product-info">
                    <h3>همبرگر</h3>
                    <p>همبرگر ذغالی مخصوص با گوشت  تازه</p>
                    <span class="price">150000</span>
                    <button class="add-to-cart-btn">+</button>
                </div>
            </div>
			<div class="product-card" data-category="kabab">
                <div class="product-image-container">
                    <img src="asset/img/kabab2.jpg" alt="کباب">
                </div>
                <div class="product-info">
                    <h3>لفمه کباب</h3>
                    <p>لقمه کباب با برنج 100 % ایرانی و گوشت تازه </p>
                    <span class="price">150000</span>
                    <button class="add-to-cart-btn">+</button>
                </div>
            </div>
            <div class="product-card" data-category="fried">
                <div class="product-image-container">
                    <img src="asset/img/sokhari1.jpg" alt="مرغ سوخاری">
                </div>
                <div class="product-info">
                    <h3>مرغ سوخاری</h3>
                    <p>مرغ سوخاری ترد و خوشمزه با سیب‌زمینی</p>
                    <span class="price">280000</span>
                    <button class="add-to-cart-btn">+</button>
                </div>
            </div>
            <div class="product-card" data-category="noshidani">
                <div class="product-image-container">
                    <img src="asset/img/noshidani1.jpg" alt="نوشیدنی">
                </div>
                <div class="product-info">
                    <h3>دوغ</h3>
                    <p>دوغ سنتی خوش طعم</p>
                    <span class="price">150000</span>
                    <button class="add-to-cart-btn">+</button>
                </div>
            </div> -->
        </section>

        <!-- سایدبار سبد خرید -->
        <aside class="cart-sidebar">
            <div class="cart-header">سبد خرید</div>
            <div class="cart-items"></div>
            <div class="cart-summary">
                <div class="summary-row">
                    <span>جمع کل:</span>
                    <span class="total-amount">0</span>
                </div>
            </div>
            <button class="checkout-btn" id="checkout-btn">رفتن به سبد خرید</button>
        </aside>
    </div>

    <!-- Modal محصول -->
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
                <button class="add-to-cart-modal-btn">افزودن به سبد خرید</button>
            </div>
        </div>
    </div>

    <script src="js/food.js"></script>
</body>
</html>
<?php

    function show_food($type)
    {

        $connect=mysqli_connect('localhost','root','','daspokht');
        $sql='SELECT * FROM `foods` WHERE available=1 and`Type`='.$type;
        $result=mysqli_query($connect,$sql);
        return $result;
                
    }
        
?>