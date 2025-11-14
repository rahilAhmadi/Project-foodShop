//  برای شناسایی حروف فارسی
const persianRegex = /^[\u0600-\u06FF\s]+$/;
function validateLoginForm() {
    // گرفتن المان‌های ورودی
    const userInput = document.getElementById('input_user');
    const passInput = document.getElementById('input_pass');

    // گرفتن المان‌های نمایش خطا
    const userError = document.getElementById('userError');
    const passError = document.getElementById('passError');
    const generalError = document.getElementById('generalError');
    
    // اطمینان از وجود المان‌های خطا برای جلوگیری از خطای "Cannot set properties of null"
    if (!userError || !passError || !generalError) {
        console.error("خطای جاوااسکریپت: یکی از تگ‌های نمایش خطا (userError/passError/generalError) پیدا نشد. آن‌ها را در HTML اضافه کنید.");
        return true; 
    }

    // ریست کردن پیام‌ها و کلاس‌های خطا
    userError.textContent = '';
    passError.textContent = '';
    generalError.textContent = '';
    userInput.classList.remove('input-error');
    passInput.classList.remove('input-error');

    let isValid = true; // پرچم نهایی که وضعیت اعتبارسنجی را مشخص می‌کند
    const username = userInput.value.trim();
    const password = passInput.value.trim();
    const illegalChars = ['"', "'", ';']; 

    // --- اعتبارسنجی نام کاربری:  ---
    if (username === '') {
        userError.textContent = 'لطفاً نام کاربری را وارد کنید.';
        userInput.classList.add('input-error');
        isValid = false;
    } else if (persianRegex.test(username)) { 
        userError.textContent = 'نام کاربری مجاز به استفاده از حروف فارسی نیست.';
        userInput.classList.add('input-error');
        isValid = false;
    } else if (username.length < 5 || username.length > 10 ) { 
        userError.textContent =  'نام کاربری باید بین 5 تا 10 کاراکتر باشد.';
        userInput.classList.add('input-error');
        isValid = false;
    } else if (! /^[a-zA-Z0-9_.-]+$/.test(username)) {
        userError.textContent = 'نام کاربری فقط می‌تواند شامل حروف و اعداد انگلیسی باشد.';
        userInput.classList.add('input-error');
        isValid = false;
    } else {
        for (const char of illegalChars) {
            if (username.includes(char)) {
                userError.textContent = `نام کاربری نمی‌تواند شامل کاراکتر غیرمجاز "${char}" باشد.`;
                userInput.classList.add('input-error');
                isValid = false;
                break;
            }
        }
    }


    // --- اعتبارسنجی رمز عبور: (حداقل ۸ کاراکتر) ---
    if (password === '') {
        passError.textContent = 'لطفاً رمز عبور را وارد کنید.';
        passInput.classList.add('input-error');
        isValid = false;
    } else if (persianRegex.test(password)) { 
        passError.textContent = 'رمز عبور مجاز به استفاده از حروف فارسی نیست.';
        passInput.classList.add('input-error');
        isValid = false;
    } else if (password.length < 8) { 
        passError.textContent = 'رمز عبور باید حداقل ۸ کاراکتر باشد.';
        passInput.classList.add('input-error');
        isValid = false;
    } else {
        for (const char of illegalChars) {
            if (password.includes(char)) {
                passError.textContent = `رمز عبور نمی‌تواند شامل کاراکتر غیرمجاز "${char}" باشد.`;
                passInput.classList.add('input-error');
                isValid = false;
                break;
            }
        }
    }

    // --- نتیجه نهایی ---
    // اگر در طول اعتبارسنجی، isValid به false تغییر کرده باشد
    if (!isValid) {
        generalError.textContent = 'لطفاً خطاهای موجود را برطرف کنید.';
        return false; // **این خط کلید جلوگیری از ارسال فرم است**
    }

    return true; // اگر isValid == true باشد، فرم مجاز به ارسال است
}

const loginForm = document.getElementById('loginForm'); // 

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        if (!validateLoginForm()) {
            e.preventDefault(); 
        }
    });
}
