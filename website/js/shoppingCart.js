// shoppingCart.js (نسخه نهایی و کامل)

document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".cart-items");
    const totalEl = document.querySelector(".jamkol_txt strong");
    const discountInput = document.querySelector(".discount-input");
    const applyBtn = document.querySelector(".apply-discount");
    const payBtn = document.querySelector(".pay-btn"); 
    
    const msgBox = document.createElement("p");
    msgBox.classList.add("discount-msg");
    document.querySelector(".discount-box").appendChild(msgBox);
    
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    function formatPrice(num) {
        // اطمینان از اینکه ورودی عدد است
        return Number(num).toLocaleString("fa-IR") + " تومان";
    }
    
    // ⬅️ تابع حیاتی ذخیره مبلغ نهایی در localStorage
    function saveFinalAmount(amount) {
        // تبدیل به رشته، حذف تمام حروف (شامل 'تومان' و جداکننده‌ها) و ذخیره عدد خالص
        let cleanAmount = String(amount).replace(/[^0-9\u06F0-\u06F9]/g, ''); 
        // تبدیل اعداد فارسی به انگلیسی و سپس به عدد
        cleanAmount = cleanAmount.replace(/[\u06F0-\u06F9]/g, (d) => d.charCodeAt(0) - 1776);
        localStorage.setItem("finalAmount", Math.round(Number(cleanAmount || 0)));
    }

    function renderCart() {
        cartContainer.innerHTML = "";
        let total = 0;
        
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p class='empty-cart-msg'>سبد خرید شما خالی است.</p>";
            saveFinalAmount(0); 
            totalEl.textContent = formatPrice(0);
            return;
        }

        cart.forEach((item, index) => {
            total += item.price * item.qty;
            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <span class="item-name">${item.name}</span>
                <div class="item-controls">
                    <button class="quantity-btn decrease" data-index="${index}">-</button>
                    <span class="quantity">${item.qty}</span>
                    <button class="quantity-btn increase" data-index="${index}">+</button>
                </div>
                <span class="item-price">${formatPrice(item.price * item.qty)}</span>
                <button class="remove-item" data-index="${index}">حذف</button>
            `;
            
            // هندل کردن دکمه‌های کنترلی (با فراخوانی renderCart برای به‌روزرسانی total)
            div.querySelector(".decrease").addEventListener("click", (e) => {
                const itemIndex = e.target.dataset.index;
                if(cart[itemIndex].qty > 1) cart[itemIndex].qty--;
                else cart.splice(itemIndex, 1);
                localStorage.setItem("cartItems", JSON.stringify(cart));
                renderCart();
            });
            
            div.querySelector(".increase").addEventListener("click", (e) => {
                const itemIndex = e.target.dataset.index;
                if(cart[itemIndex].qty < 10) cart[itemIndex].qty++;
                localStorage.setItem("cartItems", JSON.stringify(cart));
                renderCart();
            });
            
            div.querySelector(".remove-item").addEventListener("click", (e) => {
                const itemIndex = e.target.dataset.index;
                cart.splice(itemIndex, 1);
                localStorage.setItem("cartItems", JSON.stringify(cart));
                renderCart();
            });
            
            cartContainer.appendChild(div);
        });
        
        // ⬅️ ذخیره مبلغ اولیه در localStorage هنگام رندر
        saveFinalAmount(total); 
        totalEl.textContent = formatPrice(total);
    }

    renderCart();

    // ------------------------------------
    // منطق اعمال کد تخفیف
    // ------------------------------------
    applyBtn.addEventListener("click", () => {
        let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        const code = discountInput.value.trim().toUpperCase();
        
        msgBox.textContent = ""; 
        msgBox.className = "discount-msg";
        
        if (cart.length === 0) {
            msgBox.textContent = "سبد خرید خالی است.";
            msgBox.className = "discount-msg error";
            return;
        }

        if (code === "SAVE10") {
            const discounted = total * 0.9;
            totalEl.textContent = formatPrice(discounted);
            msgBox.textContent = "تخفیف ۱۰٪ اعمال شد!";
            msgBox.className = "discount-msg success";
            
            saveFinalAmount(discounted); 
            
        } else {
            totalEl.textContent = formatPrice(total);
            msgBox.textContent = "کد نامعتبر است.";
            msgBox.className = "discount-msg error";
            
            saveFinalAmount(total); 
        }
    });

    // ------------------------------------
    // هندل کردن دکمه پرداخت
    // ------------------------------------
    payBtn.parentElement.addEventListener("click", (e) => {
        if (cart.length === 0) {
            e.preventDefault(); 
            alert("سبد خرید شما خالی است و امکان پرداخت وجود ندارد!"); 
            return;
        }

        // بازخوانی مبلغ نمایش داده شده از DOM (برای در نظر گرفتن تخفیف)
        const finalAmountString = totalEl.textContent;
        // پاکسازی متن برای اطمینان از استخراج عدد
        const finalAmountClean = finalAmountString.replace(/[^0-9\u06F0-\u06F9]/g, ''); // شامل اعداد فارسی
        
        // ذخیره مجدد مبلغ نهایی برای اطمینان قبل از ریدایرکت
        saveFinalAmount(finalAmountClean);
    });
});