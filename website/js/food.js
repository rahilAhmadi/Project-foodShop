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

// باز کردن Modal با اطلاعات محصول
productCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if(e.target.classList.contains('add-to-cart-btn')) return; 
        const img = card.querySelector('img').src;
        const name = card.querySelector('h3').innerText;
        const desc = card.querySelector('p').innerText;
        const price = card.querySelector('.price').innerText;

        modalImg.src = img;
        modalName.innerText = name;
        modalDesc.innerText = desc;
        modalPrice.innerText = price + " تومان";
        quantityEl.innerText = 1;
        modal.classList.remove('hidden');
        modal.dataset.price = price;
        modal.dataset.name = name;
    });

    // افزودن مستقیم به سبد خرید از کارت
    card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
        const name = card.querySelector('h3').innerText;
        const price = parseInt(card.querySelector('.price').innerText);
        addToCart(name, price, 1);
    });
});

// بستن Modal
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

// تغییر تعداد در Modal
decreaseBtn.addEventListener('click', () => {
    let qty = parseInt(quantityEl.innerText);
    if(qty > 1) quantityEl.innerText = qty - 1;
});
increaseBtn.addEventListener('click', () => {
    let qty = parseInt(quantityEl.innerText);
    quantityEl.innerText = qty + 1;
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
    if(existing) {
        existing.qty += qty;
    } else {
        cart.push({name, price, qty});
    }
    renderCart();
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
            <span class="item-price">${item.price * item.qty} تومان</span>
        `;
        // تغییر تعداد در سبد خرید
        div.querySelector('.decrease').addEventListener('click', () => {
            if(item.qty > 1) item.qty--;
            else cart = cart.filter(i => i !== item);
            renderCart();
        });
        div.querySelector('.increase').addEventListener('click', () => {
            item.qty++;
            renderCart();
        });

        cartItemsContainer.appendChild(div);
    });
    totalAmountEl.innerText = total.toLocaleString();
}

// دسته‌بندی محصولات
const categoryLinks = document.querySelectorAll('.categories a');
categoryLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const category = link.dataset.category;
        productCards.forEach(card => {
            if(category === 'all' || card.dataset.category === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
