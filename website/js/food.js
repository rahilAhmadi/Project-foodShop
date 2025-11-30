// food.js (نسخه نهایی و اصلاح‌شده)

// انتخاب عناصر
const productCards = document.querySelectorAll('.product-card');
const modal = document.querySelector('.modal');
const modalImg = modal.querySelector('.modal-img');
const modalName = modal.querySelector('#modal-name');
const modalDesc = modal.querySelector('.modal-desc');
const modalPrice = modal.querySelector('.modal-price');
const closeBtn = modal.querySelector('.close-btn');
const quantityEl = modal.querySelector('.quantity');
const decreaseBtn = modal.querySelector('.decrease');
const increaseBtn = modal.querySelector('.increase');
const addModalBtn = modal.querySelector('.add-to-cart-modal-btn');
const cartItemsContainer = document.querySelector('.cart-items');
const totalAmountEl = document.querySelector('.total-amount');
const checkoutBtn = document.getElementById("checkout-btn");
const loginBtn = document.getElementById("login-btn"); // دکمه لاگین در سایدبار
const loginModalBtn = document.getElementById("login-modal-btn"); // دکمه لاگین در مودال

let cart = [];

// بررسی وضعیت لاگین کاربر
const isUserLoggedIn = () => 
  document.querySelector('meta[name="user-logged-in"]').getAttribute('content') === 'true';

// قالب‌بندی قیمت
const formatPrice = num => Number(num).toLocaleString("fa-IR") + " تومان";

// تبدیل متن قیمت به عدد صحیح (این تابع دیگر استفاده نمی‌شود اما حفظ می‌شود)
const parsePrice = str => {
    // حذف کاما (,), ویرگول‌های فارسی (٬), فضای خالی (\s) و متن "تومان"
    const cleanStr = String(str).replace(/[,٬\sتومان]/g, '');
    return Number(cleanStr);
  };

// ⬅️ ✅ اصلاحیه کلیدی ۱: بارگذاری سبد خرید با تضمین عددی بودن قیمت‌ها
if(localStorage.getItem("cartItems")){
    try {
        let loadedCart = JSON.parse(localStorage.getItem("cartItems"));
        // تبدیل قیمت‌ها به عدد در زمان لود از Local Storage
        cart = loadedCart.map(item => ({
            ...item,
            price: Number(item.price) 
        }));
    } catch (e) {
        console.error("خطا در خواندن سبد خرید:", e);
        cart = [];
    }
}

// ذخیره سبد خرید در localStorage
const saveCart = () => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
}

// ------------------------------------
// تابع مرکزی افزودن به سبد خرید
// ------------------------------------
function addToCart(newItem) {
    const existingItem = cart.find(item => item.id === newItem.id);

    if (existingItem) {
        existingItem.qty += newItem.qty;
        if (existingItem.qty > 10) existingItem.qty = 10;
    } else {
        cart.push(newItem);
    }
    
    saveCart();
    renderCart();
}

// ------------------------------------
// Event Listeners برای کارت‌های محصول
// ------------------------------------

// 1. افزودن سریع با دکمه '+' روی کارت
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); 
        
        const card = button.closest('.product-card');
        const id = button.dataset.id;
        const name = card.querySelector('h3').textContent;
        
        // ⬅️ ✅ اصلاحیه کلیدی ۲: خواندن قیمت خام از dataset
        const priceEl = card.querySelector('.price'); 
        const price = Number(priceEl.dataset.price); // استفاده مستقیم از عدد خام ذخیره شده
        
        const qty = 1;
        
        if (isUserLoggedIn()) {
             addToCart({ id, name, price, qty });
        } else {
            window.location.href = `login.html?redirect=${encodeURIComponent(window.location.href)}`;
        }
    });
});


// 2. باز کردن مودال با کلیک روی کارت
productCards.forEach(card => {
    card.addEventListener('click', () => {
        // ما ID و Price را از card.querySelector('.price') یا خود card می‌خوانیم
        const id = card.dataset.id || card.querySelector('.add-to-cart-btn').dataset.id;
        const name = card.querySelector('h3').textContent;
        const desc = card.querySelector('p').textContent;
        const imgSrc = card.querySelector('img').src; 
        
        // پر کردن مودال
        modalImg.src = imgSrc;
        modalName.textContent = name;
        modalDesc.textContent = desc;
        modalPrice.textContent = card.querySelector('.price').textContent;

        // ⬅️ ذخیره ID و قیمت خام در دکمه Add to Cart مودال
        if(addModalBtn){
             // فرض می‌کنیم dataset.id روی خود card تنظیم شده است.
            addModalBtn.dataset.id = id;
            
            // قیمت خام را از dataset اِلمان قیمت می‌خوانیم
            const rawPrice = card.querySelector('.price').dataset.price;
            addModalBtn.dataset.price = rawPrice; // ✅ اینجا قیمت خالص (عدد) ذخیره می‌شود
        }

        quantityEl.textContent = '1';
        // نمایش مودال
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    });
});


// بستن Modal
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

/** بستن مودال با کلیک روی بک‌دراپ */
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
        document.body.style.overflow = 'auto'; // مهم: فعال کردن اسکرول
        quantityEl.textContent = '1'; // ریست کمیت
    }
});

/** بستن مودال با Escape */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modal.classList.add("hidden");
        document.body.style.overflow = 'auto'; // مهم: فعال کردن اسکرول
        quantityEl.textContent = '1'; // ریست کمیت
    }
});


// ------------------------------------
// Event Listeners برای مودال
// ------------------------------------

closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; 
    quantityEl.textContent = '1'; // ریست کمیت
});

decreaseBtn.addEventListener('click', () => {
    let currentQty = Number(quantityEl.textContent);
    if (currentQty > 1) quantityEl.textContent = currentQty - 1;
});

increaseBtn.addEventListener('click', () => {
    let currentQty = Number(quantityEl.textContent);
    if (currentQty < 10) quantityEl.textContent = currentQty + 1;
    else alert("حداکثر تعداد سفارش برای هر غذا ۱۰ عدد است!");
});

if(addModalBtn) addModalBtn.addEventListener('click', () => {
    
    const id = addModalBtn.dataset.id; 
    const name = modalName.textContent;
    
    // ⬅️ ✅ این خط قیمت خام (عدد) را از dataset دکمه می‌خواند و قبلاً درست بود
    const rawPrice = Number(addModalBtn.dataset.price);
    const qty = Number(quantityEl.textContent);
    
    // بررسی ساده برای اطمینان از صحت قیمت
    if (isNaN(rawPrice) || rawPrice <= 0) {
        alert("خطا: قیمت محصول نامعتبر است. لطفاً صفحه را رفرش کنید.");
        return;
    }
    
    addToCart({ 
        id: id, 
        name: name,
        price: rawPrice, // ارسال قیمت به صورت عدد خالص
        qty: qty
    });
    
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; 
    quantityEl.textContent = '1'; 
});


if(loginModalBtn) loginModalBtn.addEventListener("click", () => {
    window.location.href = `login.html?redirect=${encodeURIComponent(window.location.href)}`;
});

// ------------------------------------
// رندر کردن سبد خرید در سایدبار
// ------------------------------------

const renderCart = () => {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p style='text-align: center; color: #555;'>سبد خرید خالی است.</p>";
    totalAmountEl.textContent = formatPrice(0);
    return;
  }
  
  cart.forEach(item => {
    // ⬅️ این خطی که قبلاً NaN می‌داد، اکنون باید درست کار کند چون item.price عدد است:
    total += item.price * item.qty; 
    
    const div = document.createElement('div');
    div.classList.add('cart-item');
    
    div.innerHTML = `
        <span class="item-name">${item.name}</span>
        <div class="item-controls">
            <button class="quantity-btn decrease" data-id="${item.id}">-</button> 
            <span class="quantity">${item.qty}</span>
            <button class="quantity-btn increase" data-id="${item.id}">+</button>
        </div>
        <span class="item-price">${formatPrice(item.price * item.qty)}</span>
    `;
    
    // ⬅️ اصلاح event listener ها برای استفاده از ID
    div.querySelector('.decrease').addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const existingItem = cart.find(i => i.id === id);
        
        if (existingItem && existingItem.qty > 1) existingItem.qty--;
        else cart = cart.filter(i => i.id !== id);
        
        saveCart();
        renderCart();
    });
    
    div.querySelector('.increase').addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const existingItem = cart.find(i => i.id === id);
        
        if (existingItem && existingItem.qty < 10) existingItem.qty++;
        else alert("حداکثر تعداد سفارش برای هر غذا ۱۰ عدد است!");
        
        saveCart();
        renderCart();
    });

    cartItemsContainer.appendChild(div);
  });

  totalAmountEl.textContent = formatPrice(total);
};


// ------------------------------------
// رفتن به صفحه سبد خرید (دکمه "رفتن به سبد خرید" یا "برای پرداخت وارد شوید")
// ------------------------------------
if (checkoutBtn) checkoutBtn.addEventListener("click", e => {
  e.preventDefault();

  if (cart.length === 0) { alert("سبد خرید شما خالی است!"); return; }

  // ذخیره مبلغ نهایی (جمع کل) قبل از ریدایرکت
  localStorage.setItem("finalAmount", cart.reduce((sum, item) => sum + item.price * item.qty, 0));

  if (isUserLoggedIn()) window.location.href = "shoppingCart.php";
  else window.location.href = `login.html?redirect=${encodeURIComponent('shoppingCart.php')}`;
});

// هدایت کاربر به صفحه لاگین (دکمه login-btn سایدبار)
if (loginBtn) loginBtn.addEventListener("click", () => {
  window.location.href = `login.html?redirect=${encodeURIComponent('shoppingCart.php')}`;
});

// لود اولیه
document.addEventListener("DOMContentLoaded", () => {
    const priceEls = document.querySelectorAll(".price");
    priceEls.forEach(el => {
        // عدد اصلی انگلیسی (استفاده از منطق شما برای حذف کاما در قیمت اولیه)
        const num = Number(el.innerText.replace(/,/g,''));
        el.dataset.price = num;  // ذخیره عدد اصلی (برای استفاده در افزودن به سبد)
        el.innerText = formatPrice(num); // نمایش فارسی (با کاما و تومان)
    });
    renderCart();
});