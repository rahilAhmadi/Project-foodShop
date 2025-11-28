const amountEl = document.getElementById("payment-amount");
let finalAmount = localStorage.getItem("payableAmount") || 250000;
amountEl.textContent = Number(finalAmount).toLocaleString("fa-IR") + " تومان";

// تایمر معکوس 10 دقیقه
let time = 10 * 60; // 10 دقیقه
const timerEl = document.getElementById("timer");
const countdown = setInterval(() => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerEl.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
  time--;
  if(time < 0){
    clearInterval(countdown);
    alert("زمان پرداخت تمام شد!");
    window.location.href = "food.php?index=1";
  }
},1000);

// دکمه انصراف
document.getElementById("cancel").addEventListener("click", () => {
  window.location.href = "food.php?index=1";
});

// کپچا عددی
const captchaTextEl = document.getElementById("captcha-text");
const captchaInput = document.getElementById("captcha-input");
const refreshBtn = document.getElementById("refresh-captcha");
let captchaText = "";
function generateCaptcha(){
  captchaText = Math.floor(100000 + Math.random() * 900000).toString();
  captchaTextEl.textContent = captchaText;
}
refreshBtn.addEventListener("click", generateCaptcha);
generateCaptcha();

// محدود کردن فیلدهای عددی فقط به اعداد
["card","cvv","mm","yy","pin","captcha-input"].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener("input", function(){
    this.value = this.value.replace(/\D/g, ''); // فقط اعداد
  });
});

// محدود کردن ایمیل به حروف انگلیسی، اعداد و @ .
const emailInput = document.getElementById("email");
emailInput.addEventListener("input", function(){
  this.value = this.value.replace(/[^a-zA-Z0-9@._-]/g, '');
});

// اعتبارسنجی فرم
document.getElementById("payForm").addEventListener("submit", function(e){
  e.preventDefault();

  const fields = [
    {
      el: document.getElementById("card"),
      validator: val => /^\d{16}$/.test(val),
      errorEl: document.getElementById("card-error"),
      msg: "شماره کارت ۱۶ رقمی معتبر نیست!"
    },
    {
      el: document.getElementById("cvv"),
      validator: val => /^\d{3,4}$/.test(val),
      errorEl: document.getElementById("cvv-error"),
      msg: "CVV2 معتبر نیست!"
    },
    {
      el: document.getElementById("mm"),
      validator: val => /^\d{1,2}$/.test(val) && val >= 1 && val <= 12,
      errorEl: document.getElementById("mm-error"),
      msg: "ماه معتبر نیست!"
    },
    {
      el: document.getElementById("yy"),
      validator: val => /^\d{2}$/.test(val),
      errorEl: document.getElementById("yy-error"),
      msg: "سال معتبر نیست!"
    },
    {
      el: document.getElementById("pin"),
      validator: val => /^\d{4,6}$/.test(val),
      errorEl: document.getElementById("pin-error"),
      msg: "رمز اینترنتی معتبر نیست!"
    },
    {
      el: document.getElementById("captcha-input"),
      validator: val => /^\d+$/.test(val) && val === captchaText,
      errorEl: document.getElementById("captcha-error"),
      msg: "کد امنیتی اشتباه است!"
    },
    {
      el: document.getElementById("email"),
      validator: val => val === "" || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
      errorEl: document.getElementById("email-error"),
      msg: "ایمیل معتبر نیست!"
    }
  ];

  let isValid = true;
  fields.forEach(f => {
    if(!f.validator(f.el.value.trim())){
      f.el.classList.add("error");
      f.errorEl.textContent = f.msg;
      isValid = false;
    } else {
      f.el.classList.remove("error");
      f.errorEl.textContent = "";
    }
  });

  if(isValid){
    // اگر اعتبارسنجی موفق بود، فرم را ارسال کن
    this.submit();
  }
});
