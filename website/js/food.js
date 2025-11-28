// food.js (نسخه نهایی)

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

// تبدیل متن قیمت به عدد صحیح
const parsePrice = str => Number(str.toString().replace(/,/g,'').replace(/٬/g,'').replace(/ تومان/g,''));

// بارگذاری سبد خرید از localStorage
if(localStorage.getItem("cartItems")){
    try {
        cart = JSON.parse(localStorage.getItem("cartItems"));
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
        const id = button.dataset.id; // ⬅️ خواندن ID از دکمه
        const name = card.querySelector('h3').textContent;
        const priceText = card.querySelector('.price').textContent;
        const price = parsePrice(priceText); 
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
        const id = card.querySelector('.add-to-cart-btn').dataset.id; // ⬅️ خواندن ID از دکمه
        const name = card.querySelector('h3').textContent;
        const priceText = card.querySelector('.price').textContent;
        const desc = card.querySelector('p').textContent;
        const imgSrc = card.querySelector('img').src; 
        
        // پر کردن مودال
        modalImg.src = imgSrc;
        modalName.textContent = name;
        modalDesc.textContent = desc;
        modalPrice.textContent = formatPrice(parsePrice(priceText));
        
        // ⬅️ ذخیره id در دکمه Add to Cart مودال
        if(addModalBtn) addModalBtn.dataset.id = id; 
        
        // نمایش مودال
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    });
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
    // ⬅️ خواندن ID از دکمه
    const id = addModalBtn.dataset.id; 
    const name = modalName.textContent;
    const priceText = modalPrice.textContent;
    const qty = Number(quantityEl.textContent);
    
    addToCart({ 
        id: id, 
        name: name,
        price: parsePrice(priceText),
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
    renderCart();
});