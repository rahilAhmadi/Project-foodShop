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

let cart = [];

// اگر localStorage حاوی سبد خرید بود، بارگذاری کن
if(localStorage.getItem("cartItems")){
    cart = JSON.parse(localStorage.getItem("cartItems"));
}

// قالب‌بندی قیمت
function formatPrice(num) {
    return Number(num).toLocaleString("fa-IR") + " تومان";
}

// وقتی صفحه لود شد، همه قیمت‌ها را فارسی + تومان کن و عدد اصلی را ذخیره کن
document.addEventListener("DOMContentLoaded", () => {
    const priceEls = document.querySelectorAll(".price");
    priceEls.forEach(el => {
        const num = Number(el.innerText.replace(/,/g,''));
        el.dataset.price = num;
        el.innerText = formatPrice(num);
    });
    renderCart();
});

// باز کردن Modal با اطلاعات محصول
productCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if(e.target.classList.contains('add-to-cart-btn')) return; 
        const img = card.querySelector('img').src;
        const name = card.querySelector('h3').innerText;
        const desc = card.querySelector('p').innerText;
        const price = parseInt(card.querySelector('.price').dataset.price, 10);

        modalImg.src = img;
        modalName.innerText = name;
        modalDesc.innerText = desc;
        modalPrice.dataset.price = price;
        modalPrice.innerText = formatPrice(price);
        modal.dataset.price = price;
        quantityEl.innerText = 1;
        modal.classList.remove('hidden');
        modal.dataset.name = name;
    });

    // افزودن مستقیم به سبد خرید از کارت
    card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
        const name = card.querySelector('h3').innerText;
        const price = parseInt(card.querySelector('.price').dataset.price, 10);
        addToCart(name, price, 1);
    });
});

// بستن Modal
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") modal.classList.add("hidden"); });

// تغییر تعداد در Modal
decreaseBtn.addEventListener('click', () => {
    let qty = parseInt(quantityEl.innerText);
    if(qty > 1) quantityEl.innerText = qty - 1;
});
increaseBtn.addEventListener('click', () => {
    let qty = parseInt(quantityEl.innerText);
    if (qty < 10) quantityEl.innerText = qty + 1;
    else alert("حداکثر تعداد هر محصول ۱۰ عدد است!");
});

// افزودن به سبد خرید از Modal
addModalBtn.addEventListener('click', () => {
    const name = modal.dataset.name;
    const price = parseInt(modal.dataset.price);
    const qty = parseInt(quantityEl.innerText);
    addToCart(name, price, qty);
    modal.classList.add('hidden');
});

// افزودن یا بروزرسانی سبد خرید
function addToCart(name, price, qty) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty = Math.min(existing.qty + qty, 10);
    } else {
        cart.push({name, price, qty: Math.min(qty, 10)});
    }

    saveCart();
    renderCart();
}

// ذخیره سبد خرید در localStorage
function saveCart(){
    localStorage.setItem("cartItems", JSON.stringify(cart));
}

// نمایش سبد خرید
function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <span class="item-name">${item.name}</span>
            <div class="item-controls">
                <button class="quantity-btn decrease">-</button>
                <span class="quantity">${item.qty}</span>
                <button class="quantity-btn increase">+</button>
            </div>
            <span class="item-price">${formatPrice(item.price * item.qty)}</span>
        `;
        div.querySelector('.decrease').addEventListener('click', () => {
            if(item.qty > 1) item.qty--;
            else cart = cart.filter(i => i !== item);
            saveCart();
            renderCart();
        });
        div.querySelector('.increase').addEventListener('click', () => {
            if(item.qty < 10) item.qty++;
            saveCart();
            renderCart();
        });

        cartItemsContainer.appendChild(div);
    });
    totalAmountEl.innerText = formatPrice(total);
}

// رفتن به صفحه سبد خرید
document.addEventListener("DOMContentLoaded", () => {
    const checkoutBtn = document.getElementById("checkout-btn");
    checkoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if(cart.length === 0){
            alert("سبد خرید شما خالی است!");
            return;
        }
        localStorage.setItem("finalAmount", cart.reduce((sum, item) => sum + item.price * item.qty, 0));
        window.location.href = "shoppingCart.html";
    });
});
