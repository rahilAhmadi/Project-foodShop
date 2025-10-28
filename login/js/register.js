// دریافت المان‌های فرم و ورودی‌ها
const form = document.getElementById('form');
const nameInput = document.getElementById('name_user_rigister');
const userInput = document.getElementById('input_user');
const passInput = document.getElementById('input_pass');
const togglePassword = document.querySelector('.toggle');

// المان‌های پیام راهنمای رمز عبور
const messageBox = document.getElementById("message");
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");

// -------------------------------------------------------------------
// توابع نمایش خطا و موفقیت
// -------------------------------------------------------------------

function setError(input, message) {
    const formControl = input.parentElement;
    const errorSpan = formControl.querySelector('span');
    formControl.className = 'form-control error';
    errorSpan.innerText = message;
}

function setSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// -------------------------------------------------------------------
// توابع اعتبارسنجی اصلی
// -------------------------------------------------------------------

/**
 * اعتبارسنجی فیلد نام (فقط حروف فارسی، حداقل 2 و حداکثر 50 کاراکتر)
 */
function validateName() {
    const nameValue = nameInput.value.trim();
    // حروف فارسی و فاصله، حداقل 2 تا 50 کاراکتر
    const nameRegex = /^[\u0621-\u064A\s]{2,50}$/; 

    if (nameValue === '') {
        setError(nameInput, 'پر کردن نام الزامی است.');
        return false;
    } else if (!nameRegex.test(nameValue)) {
        setError(nameInput, 'نام باید فقط شامل حروف فارسی باشد.');
        return false;
    } else if (nameValue.length < 2 || nameValue.length > 50) {
         setError(nameInput, 'نام باید بین 2 تا 50 کاراکتر باشد.');
        return false;
    } else {
        setSuccess(nameInput);
        return true;
    }
}

/**
 * اعتبارسنجی فیلد نام کاربری (دقیقاً ۸ کاراکتر)
 */
function validateUsername() {
    const userValue = userInput.value.trim();
    // حروف انگلیسی، اعداد، آندرسکور (_) و دات (.), دقیقاً 8 کاراکتر
    const usernameRegex = /^[a-zA-Z0-9_.-]{8}$/; 

    if (userValue === '') {
        setError(userInput, 'پر کردن نام کاربری الزامی است.');
        return false;
    } else if (userValue.length !== 8) { 
        setError(userInput, 'نام کاربری باید دقیقاً ۸ کاراکتر باشد.'); // پیام اصلاح شده
        return false;
    } else if (!usernameRegex.test(userValue)) {
        setError(userInput, 'نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد، _ و . باشد.');
        return false;
    } else {
        setSuccess(userInput);
        return true;
    }
}

/**
 * اعتبارسنجی فیلد رمز عبور (حداقل 8 کاراکتر و شرایط قدرت)
 */
function validatePassword() {
    const passValue = passInput.value;
    let isValid = true;
    
    // الگوی کلی: حداقل 8 کاراکتر، شامل عدد، حروف کوچک و بزرگ انگلیسی
    const overallRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if (passValue === '') {
        setError(passInput, 'پر کردن رمز عبور الزامی است.');
        isValid = false;
    } else if (!overallRegex.test(passValue)) {
        // این خطا فقط به عنوان خطا کلی نمایش داده می‌شود
        setError(passInput, 'رمز عبور ضعیف یا نامعتبر است. راهنما را ببینید.');
        isValid = false;
    } else {
        setSuccess(passInput);
        isValid = true;
    }
    
    // به‌روزرسانی وضعیت پیام‌های راهنما
    updatePasswordHelpMessage(passValue);

    return isValid;
}


/**
 * به‌روزرسانی وضعیت پیام‌های راهنما رمز عبور
 * @param {string} value - مقدار ورودی رمز عبور
 */
function updatePasswordHelpMessage(value) {
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const minLength = 8; // **حداقل 8 کاراکتر**

    // بررسی حرف کوچک
    if(value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // بررسی حرف بزرگ
    if(value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // بررسی عدد
    if(value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // بررسی طول
    if(value.length >= minLength) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
}


// -------------------------------------------------------------------
// Event Listeners (هندل کننده‌های رویداد)
// -------------------------------------------------------------------

// اعتبارسنجی هنگام ارسال فرم
form.addEventListener('submit', (e) => {
    // اجرای اعتبارسنجی‌ها
    const isNameValid = validateName();
    const isUserValid = validateUsername();
    const isPassValid = validatePassword();
    
    // اگر یکی از اعتبارسنجی‌ها موفق نبود، از ارسال فرم جلوگیری کن
    if (!isNameValid || !isUserValid || !isPassValid) {
        e.preventDefault();
    }
});


// اعتبارسنجی "آنی" هنگام ترک کردن فیلد (Blur)
nameInput.addEventListener('blur', validateName);
userInput.addEventListener('blur', validateUsername);
passInput.addEventListener('blur', validatePassword);


// نمایش/پنهان کردن راهنمای رمز عبور هنگام فوکوس/لغو فوکوس
passInput.addEventListener('focus', () => {
    messageBox.style.display = "block";
});

passInput.addEventListener('blur', () => {
    // اگر فیلد خالی نیست، پیام راهنما پنهان شود
    if (passInput.value.trim() !== '') {
         messageBox.style.display = "none";
    }
});

// اعتبارسنجی همزمان با تایپ کردن (برای راهنمای رمز عبور)
passInput.addEventListener('keyup', () => {
    updatePasswordHelpMessage(passInput.value);
});


// قابلیت نمایش/پنهان کردن رمز عبور
togglePassword.addEventListener('click', function (e) {
    const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passInput.setAttribute('type', type);

    // تغییر آیکون چشم
    const formControl = togglePassword.parentElement;
    if (type === 'text') {
        formControl.classList.add('hide');
    } else {
        formControl.classList.remove('hide');
    }
});

// توابع متفرقه (اختیاری)
function showVmsSnackbar(message, bgColor) {
    var x = document.getElementById("snackbar-vms");
    x.innerText = message;
    x.style.backgroundColor = bgColor;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
