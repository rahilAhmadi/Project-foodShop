// shoppingCart.js
document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".cart-items");
    const totalEl = document.querySelector(".jamkol_txt strong");
    const discountInput = document.querySelector(".discount-input");
    const applyBtn = document.querySelector(".apply-discount");
    const msgBox = document.createElement("p");
    msgBox.classList.add("discount-msg");
    document.querySelector(".discount-box").appendChild(msgBox);

    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    function formatPrice(num) {
        return Number(num).toLocaleString("fa-IR") + " تومان";
    }

    function renderCart() {
        cartContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.qty;

            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <span class="item-name">${item.name}</span>
                <div class="item-controls">
                    <button class="quantity-btn decrease">-</button>
                    <span class="quantity">${item.qty}</span>
                    <button class="quantity-btn increase">+</button>
                </div>
                <span class="item-price">${formatPrice(item.price * item.qty)}</span>
                <button class="remove-item">حذف</button>
            `;

            div.querySelector(".decrease").addEventListener("click", () => {
                if(item.qty > 1) item.qty--;
                else cart.splice(index, 1);
                localStorage.setItem("cartItems", JSON.stringify(cart));
                renderCart();
            });

            div.querySelector(".increase").addEventListener("click", () => {
                if(item.qty < 10) item.qty++;
                localStorage.setItem("cartItems", JSON.stringify(cart));
                renderCart();
            });

            div.querySelector(".remove-item").addEventListener("click", () => {
                cart.splice(index, 1);
                localStorage.setItem("cartItems", JSON.stringify(cart));
                renderCart();
            });

            cartContainer.appendChild(div);
        });

        totalEl.textContent = formatPrice(total);
    }

    renderCart();

    // کد تخفیف
    applyBtn.addEventListener("click", () => {
        let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        const code = discountInput.value.trim().toUpperCase();

        if (!code) {
            msgBox.textContent = "لطفاً کد را وارد کنید.";
            msgBox.className = "discount-msg error";
            totalEl.textContent = formatPrice(total);
            return;
        }

        if (code === "SAVE10") {
            const discounted = total * 0.9;
            totalEl.textContent = formatPrice(discounted);
            msgBox.textContent = "تخفیف اعمال شد!";
            msgBox.className = "discount-msg success";
        } else {
            totalEl.textContent = formatPrice(total);
            msgBox.textContent = "کد نامعتبر است.";
            msgBox.className = "discount-msg error";
        }
    });
});
