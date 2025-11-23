// نمایش جزئیات سفارش
const orderTotalText = document.getElementById("order-total-text");
const shippingCostText = document.getElementById("shipping-cost-text");
const payableAmountText = document.getElementById("payable-amount-text");

document.addEventListener("DOMContentLoaded", () => {
    // گرفتن مبلغ سفارش از فایل JS سبد خرید (localStorage)
    let orderTotal = Number(localStorage.getItem("finalAmount")) || 0;
    let shippingCost = 25000; // ثابت
    let payableAmount = orderTotal + shippingCost;
    localStorage.setItem("payableAmount", payableAmount);

    orderTotalText.textContent = orderTotal.toLocaleString("fa-IR") + " تومان";
    shippingCostText.textContent = shippingCost.toLocaleString("fa-IR") + " تومان";
    payableAmountText.textContent = payableAmount.toLocaleString("fa-IR") + " تومان";
});

// اعتبارسنجی فرم
const form = document.getElementById("customer-form");

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
        input.nextElementSibling.textContent = "";
    });

    const persianRegex = /^[\u0600-\u06FF\s]+$/; // فقط حروف فارسی و فاصله

    // اعتبارسنجی
    if(!firstName.value.trim() || !persianRegex.test(firstName.value)) {
        firstName.classList.add("error");
        firstName.nextElementSibling.textContent = "لطفاً نام خود را به فارسی وارد کنید";
        isValid = false;
    }

    if(!lastName.value.trim() || !persianRegex.test(lastName.value)) {
        lastName.classList.add("error");
        lastName.nextElementSibling.textContent = "لطفاً نام خانوادگی خود را به فارسی وارد کنید";
        isValid = false;
    }

    if(!city.value.trim() || !persianRegex.test(city.value)) {
        city.classList.add("error");
        city.nextElementSibling.textContent = "لطفاً نام شهر را به فارسی وارد کنید";
        isValid = false;
    }
    // آدرس: فقط فارسی و عدد
    if(!address.value.trim() || !/^[\u0600-\u06FF0-9\s,]+$/.test(address.value)) {
        address.classList.add("error");
        address.nextElementSibling.textContent = "لطفاً آدرس را با حروف فارسی و اعداد وارد کنید";
        isValid = false;
    }
    

    if(isValid){
        window.location.href = "dargah.html";
    }
});

// دکمه انصراف
document.getElementById("cancel").addEventListener("click", () => {
    window.location.href = "index.html";
});
