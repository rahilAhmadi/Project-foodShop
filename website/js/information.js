// information.js (نسخه نهایی)

// نمایش جزئیات سفارش
const orderTotalText = document.getElementById("order-total-text");
const shippingCostText = document.getElementById("shipping-cost-text");
const payableAmountText = document.getElementById("payable-amount-text");
const form = document.getElementById("customer-form");
const payButton = document.getElementById("pay"); 

const SHIPPING_COST = 25000; 
const persianRegex = /^[\u0600-\u06FF\s]+$/; // فقط حروف فارسی و فاصله
const addressRegex = /^[\u0600-\u06FF0-9\s,]+$/; // فارسی، عدد، فاصله، ویرگول

const formatPrice = num => Number(num).toLocaleString("fa-IR") + " تومان";

// ------------------------------------
// نمایش جزئیات سفارش در بارگذاری اولیه
// ------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // 1. خواندن مبلغ سفارش از localStorage
    let orderTotal = Number(localStorage.getItem("finalAmount")) || 0; 
    
    let payableAmount = orderTotal + SHIPPING_COST;
    
    // 2. ذخیره مبلغ قابل پرداخت نهایی در localStorage
    localStorage.setItem("payableAmount", payableAmount);

    // 3. نمایش مقادیر
    orderTotalText.textContent = formatPrice(orderTotal);
    shippingCostText.textContent = formatPrice(SHIPPING_COST);
    payableAmountText.textContent = formatPrice(payableAmount);
});

// ------------------------------------
// اعتبارسنجی و ارسال فرم با AJAX
// ------------------------------------
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const city = document.getElementById("city");
    const address = document.getElementById("address");

    // پاک کردن خطاهای قبلی
    [firstName, lastName, city, address].forEach(input => {
        input.classList.remove("error");
        if (input.nextElementSibling) input.nextElementSibling.textContent = "";
    });

    // اعتبارسنجی
    if(!firstName.value.trim() || !persianRegex.test(firstName.value)) {
        firstName.classList.add("error");
        if (firstName.nextElementSibling) firstName.nextElementSibling.textContent = "لطفاً نام خود را به فارسی وارد کنید";
        isValid = false;
    }

    if(!lastName.value.trim() || !persianRegex.test(lastName.value)) {
        lastName.classList.add("error");
        if (lastName.nextElementSibling) lastName.nextElementSibling.textContent = "لطفاً نام خانوادگی خود را به فارسی وارد کنید";
        isValid = false;
    }

    if(!city.value.trim() || !persianRegex.test(city.value)) {
        city.classList.add("error");
        if (city.nextElementSibling) city.nextElementSibling.textContent = "لطفاً نام شهر را به فارسی وارد کنید";
        isValid = false;
    }
    
    // آدرس: فارسی، عدد، فاصله، ویرگول
    if(!address.value.trim() || !addressRegex.test(address.value)) {
        address.classList.add("error");
        if (address.nextElementSibling) address.nextElementSibling.textContent = "لطفاً آدرس را به درستی وارد کنید";
        isValid = false;
    }
    
    // 2. اگر اعتبارسنجی موفق بود، داده‌ها را ارسال کن
    if (isValid) {
        const formData = new FormData(form);
        const cartItems = localStorage.getItem("cartItems");
        
        if (!cartItems || JSON.parse(cartItems).length === 0) {
            alert("سبد خرید شما خالی است و نمی‌توانید ادامه دهید.");
            return;
        }

        formData.append('cart_data', cartItems);

        // ارسال داده‌ها با Fetch API به save_info.php
        fetch('save_info.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            // ⬅️ منطق ریدایرکت: فقط وضعیت HTTP را چک می‌کند
            if (response.ok) {
                // اگر کد وضعیت 200 OK بود، ریدایرکت انجام می‌شود
                window.location.href = "dargah.php"; 
            } else {
                // برای عیب‌یابی بهتر، کد وضعیت را نمایش می‌دهیم
                alert("خطا در ذخیره اطلاعات سفارش در سرور! کد وضعیت: " + response.status);
            }
        })
        .catch(error => {
            console.error('خطا در ارسال داده:', error);
            alert("خطا در برقراری ارتباط با سرور!");
        });
    }
});

// ------------------------------------
// هندل کردن دکمه انصراف
// ------------------------------------
document.getElementById("cancel").addEventListener("click", () => {
    // بازگشت به صفحه سبد خرید
    window.location.href = "shoppingCart.php"; 
});