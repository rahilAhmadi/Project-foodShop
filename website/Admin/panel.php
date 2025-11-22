<?php
 include 'FoodManager.php';
if (isset($_GET['delete_id']))
        {
    $ok=Delete_food($_GET['delete_id']);
    // برای جلوگیری از تکرار حذف هنگام رفرش، ریدایرکت می‌کنیم:
    if($ok)
    {
        header("Location: panel.php?tab=product");
    }
    exit;
        }
if (isset($_GET['Avalible']))
        {
    
     $ok=Avalible_food($_GET['Avalible'],$_GET['set']);
    // برای جلوگیری از تکرار حذف هنگام رفرش، ریدایرکت می‌کنیم:
    if($ok)
    {
        header("Location: panel.php?tab=product");
    }
    exit;
        }



?>


<!DOCTYPE html>
<html lang="en">
    <?php  
        require_once 'SessionCheck.php';?>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="../css/panel.css">
    <link rel="stylesheet" href="../css/AddFood.css"
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <script src="https://kit.fontawesome.com/9d805968ce.js" crossorigin="anonymous"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>panel</title>
</head>

<body>
    <section class="dashboard">
        <aside>
            <ul class="menu_dashboard">
                <li class="logo-dashboard li-menu-dashboard"><a href="#">
                        <img src="../asset/icon/logo.png" alt="">
                    </a></li>
                <li data-name="dashboard" class="active-dashboard li-menu-dashboard"><a href="#">داشبورد<i
                            class="fas fa-home"></i></a></li>
                <li data-name="product" class="li-menu-dashboard"><a href="#">مدیریت غذاها<i class="fa fa-cutlery" aria-hidden="true"></i>
                </a></li>
                <li data-name="addProduct" class="li-menu-dashboard"><a href="#">افزودن غذا<i class="fa fa-plus" aria-hidden="true"></i></a></li>

                <li data-name="order" class="li-menu-dashboard"><a href="#">مدیریت سفارشات<i
                            class="fa-brands fa-shopify"></i></a></li>
                <li data-name="user" class="li-menu-dashboard"><a href="#">مدیریت کاربران<i
                            class="fa-solid fa-user"></i></a></li>
                <li class="li-menu-dashboard"><a href="../index.html">ورود به سایت<i class="fa-solid fa-globe"></i></a></li>
            <!-- ++++++++++ logout   -->
                <li class="li-menu-dashboard"><a href="../Admin/LogOut.php">خروج <i class="fa-solid fa-arrow-right-from-bracket"></i></a></li>
          
            </ul>
        </aside>
        <main data-id="dashboard" id="dashboard" class="index-main" dir="rtl">
            <div class="top-dashboard">
                <div class="action">
                    <div class="profile" onclick="toggleMenu()">
                        <img src="../asset/icon/user-profile.png" alt="profile img">
                    </div>
                    <div class="menu-profile-dashboard">
                        <h3>محمدرضا احمدپور
                            <br> <span>طراح و برنامه نویس وب</span>
                        </h3>
                        <ul>
                            <li><img src="../asset/icon/user-profile.png" alt=""><a href="#">پروفایل من</a></li>
                            <li><img src="../asset/icon/edit.png" alt=""><a href="#">تغییر اطلاعات</a></li>
                            <li><img src="../asset/icon/inbox.png" alt=""><a href="#">پیام ها</a></li>
                            <li><img src="../asset/icon/setting.png" alt=""><a href="#">تنظیمات</a></li>
                            <li><img src="../asset/icon/help.jpg" alt=""><a href="#">پشتیبانی</a></li>
                            <li><img src="../asset/icon/logout.png" alt=""><a href="#"> خروچ</a></li>
                        </ul>
                    </div>
                </div>
                <div class="search">
                    <input type="text" placeholder="جستجو..." class="inputSearch">
                    <button class="btnSearch">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <div class="box-dashboard">
                <div class="item-box-dashboard">
                    <div class="icon_box_dashboard order_dash"><i class="fa-solid fa-cart-shopping"></i></div>
                    <div class="text_box_dashboard">
                        <h3>تعداد سفارش</h3>
                        <p><span> 18 </span>سفارش جدید</p>
                    </div>
                </div>
                <div class="item-box-dashboard">
                    <div class="icon_box_dashboard sale_dash"><i class="fa-regular fa-credit-card"></i></div>
                    <div class="text_box_dashboard">
                        <h3>تعداد فروش</h3>
                        <p>
                            <span>12</span>
                            فروش
                        </p>
                    </div>
                </div>
                <div class="item-box-dashboard">
                    <div class="icon_box_dashboard user_dash"><i class="fa-solid fa-user"></i></div>
                    <div class="text_box_dashboard">
                        <h3>تعداد کاربر</h3>
                        <p><span>255 </span>کاربر</p>
                    </div>
                </div>

            </div>
            <div class="chart-dashboard">
                <canvas id="myChart" width="300" height="150"></canvas>

            </div>
        </main>
        <main class="prodcut_main" data-id="product">
            <ul class="product-menu">

                <li data-name="iranianFood-submenu" class="active-submenu">مدیریت غذای ایران</li>
                <li data-name="fastFood-submenu">مدیریت فست فود</li>
                <li data-name="kebab-submenu">مدیریت کباب</li>
                <li data-name="sokhari-submenu">مدیریت سوخاری</li>
                <li data-name="drink-submenu">مدیریت نوشیدنی</li>
            </ul>
            <div class="subdivs" data-id="iranianFood-submenu">
                    <?php
                    $result = Show_foods("irani");
                    while($row=mysqli_fetch_array($result))
                    {

                        echo'
                        
                    <div class="prodcut_items_box">
                    <div class="img_text_product_item">
                        <img src="../asset/img/FoodsImage/'.$row['img_url'].'" alt="">
                        <div class="text_prodcut_item_box">
                            <h3> '.$row['food_Name'].'</h3>
                            <div class="price_prodcut_box">
                                <h4> قیمت: </h4>
                                <h5>'.$row['price'].'تومان</h5> 
                            </div>
                        </div>
                    </div>
                    <div class="buttons_product_item">
                        <div class="edite_delete_buttons_product_item">
                            <a class="edit_product_item" 
                                 href="panel.php?tab=addProduct&editId='. $row['food_ID'].'">
                                    ویرایش
                                    </a>
                            <a class="delete_product_item" href="panel.php?delete_id='.$row['food_ID'].'" >حذف محصول</a>
                        </div>';

                        if($row['available']==1)
                        {
                            echo' <a class="disable_product_item" href="panel.php?set=0&Avalible='.$row['food_ID'].'">غیر فعال</a>';
                        }
                        else
                        {
                             echo' <a class="disable_product_item" href="panel.php?set=1&Avalible='.$row['food_ID'].'"> فعال</a>';
                        }
                       
                         echo'  </div>
                    </div>
                        
                        ';

                    }

                    ?>
            </div>
            <div class="subdivs" data-id="fastFood-submenu">

                 <?php
                    $result = Show_foods("fastfood");
                    while($row=mysqli_fetch_array($result))
                    {

                        echo'
                        
                    <div class="prodcut_items_box">
                    <div class="img_text_product_item">
                        <img src="../asset/img/FoodsImage/'.$row['img_url'].'" alt="">
                        <div class="text_prodcut_item_box">
                            <h3> '.$row['food_Name'].'</h3>
                            <div class="price_prodcut_box">
                                <h4> قیمت: </h4>
                                <h5>'.$row['price'].'تومان</h5> 
                            </div>
                        </div>
                    </div>
                    <div class="buttons_product_item">
                        <div class="edite_delete_buttons_product_item">
                            <a class="edit_product_item" 
                                 href="panel.php?tab=addProduct&editId='. $row['food_ID'].'">
                                    ویرایش
                                    </a>
                            <a class="delete_product_item" href="panel.php?delete_id='.$row['food_ID'].'" >حذف محصول</a>
                        </div>';

                        if($row['available']==1)
                        {
                            echo' <a class="disable_product_item" href="panel.php?set=0&Avalible='.$row['food_ID'].'">غیر فعال</a>';
                        }
                        else
                        {
                             echo' <a class="disable_product_item" href="panel.php?set=1&Avalible='.$row['food_ID'].'"> فعال</a>';
                        }
                       
                             echo'  </div>
                    </div>
                        
                        ';

                    }

                    ?>



            </div>


            <div class="subdivs" data-id="kebab-submenu">
              
                <?php
                    $result = Show_foods("kebab");
                    while($row=mysqli_fetch_array($result))
                    {

                        echo'
                        
                    <div class="prodcut_items_box">
                    <div class="img_text_product_item">
                        <img src="../asset/img/FoodsImage/'.$row['img_url'].'" alt="">
                        <div class="text_prodcut_item_box">
                            <h3> '.$row['food_Name'].'</h3>
                            <div class="price_prodcut_box">
                                <h4> قیمت: </h4>
                                <h5>'.$row['price'].'تومان</h5> 
                            </div>
                        </div>
                    </div>
                    <div class="buttons_product_item">
                        <div class="edite_delete_buttons_product_item">
                            <a class="edit_product_item" 
                                 href="panel.php?tab=addProduct&editId='. $row['food_ID'].'">
                                    ویرایش
                                    </a>
                            <a class="delete_product_item" href="panel.php?delete_id='.$row['food_ID'].'" >حذف محصول</a>
                        </div>';

                        if($row['available']==1)
                        {
                            echo' <a class="disable_product_item" href="panel.php?set=0&Avalible='.$row['food_ID'].'">غیر فعال</a>';
                        }
                        else
                        {
                             echo' <a class="disable_product_item" href="panel.php?set=1&Avalible='.$row['food_ID'].'"> فعال</a>';
                        }
                       
                             echo'  </div>
                    </div>
                        
                        ';

                    }

                    ?>

            </div>


            <div class="subdivs" data-id="sokhari-submenu">
                

                    <?php
                    $result = Show_foods("sokhari");
                    while($row=mysqli_fetch_array($result))
                    {

                        echo'
                        
                    <div class="prodcut_items_box">
                    <div class="img_text_product_item">
                        <img src="../asset/img/FoodsImage/'.$row['img_url'].'" alt="">
                        <div class="text_prodcut_item_box">
                            <h3> '.$row['food_Name'].'</h3>
                            <div class="price_prodcut_box">
                                <h4> قیمت: </h4>
                                <h5>'.$row['price'].'تومان</h5> 
                            </div>
                        </div>
                    </div>
                    <div class="buttons_product_item">
                        <div class="edite_delete_buttons_product_item">
                            <a class="edit_product_item" 
                                 href="panel.php?tab=addProduct&editId='. $row['food_ID'].'">
                                    ویرایش
                                    </a>
                            <a class="delete_product_item" href="panel.php?delete_id='.$row['food_ID'].'" >حذف محصول</a>
                        </div>';

                        if($row['available']==1)
                        {
                            echo' <a class="disable_product_item" href="panel.php?set=0&Avalible='.$row['food_ID'].'">غیر فعال</a>';
                        }
                        else
                        {
                             echo' <a class="disable_product_item" href="panel.php?set=1&Avalible='.$row['food_ID'].'"> فعال</a>';
                        }
                       
                             echo'  </div>
                    </div>
                        
                        ';

                    }

                    ?>
               
            </div>


            <div class="subdivs" data-id="drink-submenu">

               <?php
                    $result = Show_foods("drink");
                    while($row=mysqli_fetch_array($result))
                    {

                        echo'
                        
                    <div class="prodcut_items_box">
                    <div class="img_text_product_item">
                        <img src="../asset/img/FoodsImage/'.$row['img_url'].'" alt="">
                        <div class="text_prodcut_item_box">
                            <h3> '.$row['food_Name'].'</h3>
                            <div class="price_prodcut_box">
                                <h4> قیمت: </h4>
                                <h5>'.$row['price'].'تومان</h5> 
                            </div>
                        </div>
                    </div>
                    <div class="buttons_product_item">
                        <div class="edite_delete_buttons_product_item">
                            <a class="edit_product_item" 
                                 href="panel.php?tab=addProduct&editId='. $row['food_ID'].'">
                                    ویرایش
                                    </a>
                            <a class="delete_product_item" href="panel.php?delete_id='.$row['food_ID'].'" >حذف محصول</a>
                        </div>';

                        if($row['available']==1)
                        {
                            echo' <a class="disable_product_item" href="panel.php?set=0&Avalible='.$row['food_ID'].'">غیر فعال</a>';
                        }
                        else
                        {
                             echo' <a class="disable_product_item" href="panel.php?set=1&Avalible='.$row['food_ID'].'"> فعال</a>';
                        }
                       
                             echo'  </div>
                    </div>
                        
                        ';

                    }

                    ?>
            </div>
        </main>
        <main class="order_main" data-id="order"></main>
        <main data-id="addProduct" id="addfood">
            <!-- <form class="formAddProduct" action=""> -->
                <div class="food_section">
                    
                    <?php



                                        $food = null;

                                            if (isset($_GET['editId'])) {
                                                $result = Select_food($_GET['editId']);
                                                if ($result && mysqli_num_rows($result) > 0) {
                                                    $food = mysqli_fetch_assoc($result);
                                                }
                                            }
                    ?>


                    <form class="form_food" action="AddFood.php" method="POST" enctype="multipart/form-data">
                    
                        <h2 style="text-align:center;margin-bottom:15px;">افزودن غذای جدید</h2>
                    
                            <?php if ($food): ?>
                            <input type="hidden" name="food_id" value="<?= $food['food_ID'] ?>">
                             <?php endif; ?>

                        <h3 class="label_food">نام غذا:</h3>
                        <input type="text" name="food_info[name]" class="input_food" placeholder="مثلاً پیتزا مخصوص" id="name" value="<?= $food ? $food['food_Name'] : '' ?>">
                        <span class="error-message" id="nameError"></span>
                    
                        <h3 class="label_food">توضیحات غذا:</h3>
                        <textarea class="input_area" name="food_info[description]" placeholder="توضیحات..." id="description"  ><?= $food ? $food['description'] : '' ?></textarea>
                        <span class="error-message" id="descriptionError"></span>
                    
                        <h3 class="label_food">قیمت:</h3>
                        <input type="text" class="input_food"  name="food_info[price]"  placeholder="مثلاً 250000" id="price"  value="<?= $food ? $food['price'] : '' ?>">
                        <span class="error-message" id="priceError"></span>
                        <div class="food-select-box">
                            <label for="food-type" class="food-label">انتخاب نوع غذا</label>
                            <select id="food-type" name="food_info[type]" class="food-dropdown">
                                    <option value="" disabled <?= !$food ? 'selected' : '' ?>>انتخاب کنید...</option>

                                    <option value="irani"     <?= ($food && $food['Type'] == 'irani') ? 'selected' : '' ?>>غذای ایرانی</option>
                                    <option value="fastfood"  <?= ($food && $food['Type'] == 'fastfood') ? 'selected' : '' ?>>فست فود</option>
                                    <option value="kebab"     <?= ($food && $food['Type'] == 'kebab') ? 'selected' : '' ?>>کباب</option>
                                    <option value="sokhari"   <?= ($food && $food['Type'] == 'sokhari') ? 'selected' : '' ?>>سوخاری</option>
                                    <option value="drink"     <?= ($food && $food['Type'] == 'drink') ? 'selected' : '' ?>>نوشیدنی</option>

                                </select>

                          </div>
                    
                        <h3 class="label_food">تصویر غذا:</h3>
                        <input type="file"  name="food_image" class="input_food" id="image" accept="image/*">
                        <span class="error-message" id="imageError"></span>
                        <div style="margin-top:5px;">
                            <img id="imagePreview" src="../asset/img/FoodsImage<? ? $food['img_url'] : ''  ?>" alt="پیش‌نمایش تصویر" style="max-width:150px; display:none; border:1px solid #ccc; padding:3px;">
                        </div>
                
                        <input type="submit" class="btn_submit_food" value="ثبت غذا"></input>
                    
                    </form>
                    </div>
                   
            </div>
            <!-- </form> -->
        </main>
        <main class="user" data-id="user">
        <header class="ap-header">مدیریت کاربران</header>
            <div class="ap-container">
                <div class="ap-actions">
                    <input type="text" class="ap-input" placeholder="جستجوی کاربر بر اساس نام کاربری..." />
                    <button class="ap-btn ap-btn-primary">افزودن کاربر جدید</button>
                </div>
                <table class="ap-table">
                    <thead class="ap-table-head">
                        <tr>
                            <th>شناسه</th>
                            <th>نام</th>
                            <th>نام کاربری</th>
                            <th>نقش کاربر</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>علی رضایی</td>
                            <td>ali_rz</td>
                            <td>ادمین</td>
                            <td>فعال</td>
                            <td>
                                <button class="ap-btn ap-btn-success">ویرایش</button>
                                <button class="ap-btn ap-btn-danger">حذف</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>مریم احمدی</td>
                            <td>maryam_ah</td>
                            <td>کاربر</td>
                            <td>غیرفعال</td>
                            <td>
                                <button class="ap-btn ap-btn-success">ویرایش</button>
                                <button class="ap-btn ap-btn-danger">حذف</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </section>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.0/dist/Chart.min.js"></script>
   <!-- <script src="js/main.js"></script> -->
   <script>
    let inputs = document.querySelectorAll("input[type=file]");
    
    inputs.forEach((input, index) => {
        let textInput = document.querySelectorAll('.textInput')[index];
        let imgPrev = document.querySelectorAll('.image-prev')[index];
        let iconPrev = document.querySelectorAll('.icon_prev')[index];
    
        input.addEventListener("change", () => {
            let inputImage = input.files[0];
            if (inputImage) {
                const reader = new FileReader();
                iconPrev.style.display = 'none';
                imgPrev.style.display = 'block';
                textInput.style.display = 'none';
    
                reader.addEventListener('load', function () {
                    imgPrev.setAttribute('src', this.result);
                });
                reader.readAsDataURL(inputImage);
            } else {
                iconPrev.style.display = 'block';
                imgPrev.style.display = 'none';
                textInput.style.display = 'block';
                imgPrev.setAttribute('src', '');
            }
        });
    });
    
            var ctx = document.getElementById("myChart").getContext("2d");
            var myChart = new Chart(ctx, {
                type: 'polarArea',
                data: {
                    labels: ["غذای ایرانی", "فست فود", "کباب ", "سوخاری", "نوشیدنی "],
                    datasets: [
                        {
                            label: "",
                            data: [15, 2, 13, 5, 10],
                            backgroundColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                            ],
    
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
    
                    }
                }
            });
    
    
            function toggleMenu() {
                const togglemenu = document.querySelector('.menu-profile-dashboard');
                togglemenu.classList.toggle("active");
            }
            // search
            let input = document.querySelector('.inputSearch');
            let btnSearch = document.querySelector('.btnSearch');
            let search = document.querySelector('.search');
            console.log(btnSearch)
            btnSearch.addEventListener('click', function () {
                console.log('si')
                search.classList.toggle('active');
            })
    
    
            ///page context
            const limenu = document.querySelectorAll('.li-menu-dashboard')
            const mains = document.querySelectorAll('main');
    
            for (let i = 0; i < limenu.length; i++) {
                limenu[i].addEventListener('click', () => {
                    for (let a = 0; a < limenu.length; a++) {
                        limenu[a].classList.remove('active-dashboard');
                    }
                    limenu[i].classList.add('active-dashboard');
    
    
                    const target = limenu[i].getAttribute('data-name');
    
                    for (let k = 0; k < mains.length; k++) {
                        mains[k].style.display = 'none';
                        if (target == mains[k].getAttribute('data-id')) {
                            mains[k].style.display = 'block'
                        }
                    }
                })
            }
    
    
            ///submenu tab
            const lisubmenu = document.querySelectorAll('.product-menu li')
            const subdivs = document.querySelectorAll('.subdivs');
    
            for (let i = 0; i < lisubmenu.length; i++) {
                lisubmenu[i].addEventListener('click', () => {
                    for (let a = 0; a < lisubmenu.length; a++) {
                        lisubmenu[a].classList.remove('active-submenu');
                    }
                    lisubmenu[i].classList.add('active-submenu');
    
    
                    const target = lisubmenu[i].getAttribute('data-name');
    
                    for (let k = 0; k < subdivs.length; k++) {
                        subdivs[k].style.display = 'none';
                        if (target == subdivs[k].getAttribute('data-id')) {
                            subdivs[k].style.display = 'block'
                        }
                    }
                })
            }
    
    
    
// add food js
// const form = document.querySelector(".form_food");
// const imageInput = document.getElementById("image");
// const imagePreview = document.getElementById("imagePreview");

// imageInput.addEventListener("change", function() {
//     const file = this.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             imagePreview.src = e.target.result;
//             imagePreview.style.display = "block";
//         }
//         reader.readAsDataURL(file);
//     } else {
//         imagePreview.src = "";
//         imagePreview.style.display = "none";
//     }
// });

// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const fields = [
//     { input: document.getElementById("name"), error: document.getElementById("nameError"), type: "persian" },
//     { input: document.getElementById("description"), error: document.getElementById("descriptionError"), type: "persian" },
//     { input: document.getElementById("price"), error: document.getElementById("priceError"), type: "number" },
//     { input: document.getElementById("image"), error: document.getElementById("imageError"), type: "image" }
//   ];

//   const persianRegex = /^[\u0600-\u06FF\s]+$/;
//   const numberRegex = /^[0-9]+$/;
//   const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;

//   let valid = true;

  
//   fields.forEach(f => {
//     f.error.textContent = "";
//     f.input.classList.remove("input-error");
//   });

//   fields.forEach(f => {
//     const value = f.input.value.trim();
//     if (f.type === "persian") {
//       if (!value) {
//         f.error.textContent = "این فیلد را وارد کنید.";
//         f.input.classList.add("input-error");
//         valid = false;
//       } else if (!persianRegex.test(value)) {
//         f.error.textContent = "فقط حروف فارسی مجاز است.";
//         f.input.classList.add("input-error");
//         valid = false;
//       }
//     }

//     if (f.type === "number") {
//       if (!value) {
//         f.error.textContent = "این فیلد را وارد کنید.";
//         f.input.classList.add("input-error");
//         valid = false;
//       } else if (!numberRegex.test(value)) {
//         f.error.textContent = "فقط عدد مجاز است.";
//         f.input.classList.add("input-error");
//         valid = false;
//       } else {
//         const priceNum = parseInt(value, 10);
//         if (priceNum < 250000 || priceNum > 1000000) {
//           f.error.textContent = "قیمت باید بین 250,000 تا 1,000,000 تومان باشد.";
//           f.input.classList.add("input-error");
//           valid = false;
//         }
//       }
//     }

//     if (f.type === "image") {
//       const file = f.input.files[0];
//       if (!file) {
//         f.error.textContent = "یک تصویر انتخاب کنید.";
//         f.input.classList.add("input-error");
//         valid = false;
//       } else if (!imageRegex.test(file.name)) {
//         f.error.textContent = "فرمت تصویر معتبر نیست (jpg, png, gif, bmp).";
//         f.input.classList.add("input-error");
//         valid = false;
//       }
//     }
//   });

//   if (valid) {
//     alert("غذای جدید با موفقیت به منو اضافه شد!");
//       form.reset();

//     // پاک کردن پیش‌نمایش تصویر
//     imagePreview.src = "";
//     imagePreview.style.display = "none";

//     // پاک کردن کلاس‌های خطا
//     fields.forEach(f => f.input.classList.remove("input-error"));
//     // form.submit();
//   }
// });

//    ++++++++++++++++++++++++ بخش باز کردن تب از صفحه php+++++++++++++
     // فعال‌سازی تب از طریق پارامتر URL
  function activateTabByName(tabName) {
    const menuItem = document.querySelector(`.li-menu-dashboard[data-name="${tabName}"]`);
    if (menuItem) {
      menuItem.click(); // استفاده از سیستم موجود نمایش تب
    }
  }

  // بررسی ?tab=addProduct
  const params = new URLSearchParams(window.location.search);
  if (params.has('tab')) {
    const tab = params.get('tab');
    activateTabByName(tab);

    // اگر خواستی پیام موفقیت بده
    if (params.get('status') === 'success') {
      // ساده‌ترین حالت:
      alert("غذا با موفقیت ذخیره شد");
    }
  }


        </script>

</body>

</html>