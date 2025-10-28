// Regex برای شناسایی حروف فارسی/عربی
const persianRegex = /[\u0600-\u06FF\uFB8A\u067E\u0686\u0698\u06AF\u200C]/; 

function validateLoginForm() {
    // گرفتن المان‌های ورودی
    const userInput = document.getElementById('input_user');
    const passInput = document.getElementById('input_pass');

    // اگر المان‌های حیاتی پیدا نشدند، خطا می‌دهیم و اجازه ارسال می‌دهیم
    if (!userInput || !passInput) {
        console.error("خطای جاوااسکریپت: المان‌های ورودی (input_user یا input_pass) پیدا نشدند. IDها را در HTML بررسی کنید.");
        return true; 
    }

    // گرفتن المان‌های نمایش خطا (اگر این‌ها هم در HTML نباشند، کد خطا می‌دهد)
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

    let isValid = true;
    const username = userInput.value.trim();
    const password = passInput.value.trim();
    const illegalChars = ['"', "'", ';']; 

    // --- اعتبارسنجی نام کاربری: (دقیقا ۸ کاراکتر، فقط انگلیسی) ---
    if (username === '') {
        userError.textContent = 'لطفاً نام کاربری را وارد کنید.';
        userInput.classList.add('input-error');
        isValid = false;
    } else if (persianRegex.test(username)) { 
        userError.textContent = 'نام کاربری مجاز به استفاده از حروف فارسی نیست.';
        userInput.classList.add('input-error');
        isValid = false;
    } else if (username.length !== 8) { 
        userError.textContent = 'نام کاربری باید دقیقا شامل ۸ کاراکتر باشد.';
        userInput.classList.add('input-error');
        isValid = false;
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) { 
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


    // --- اعتبارسنجی رمز عبور: (حداکثر ۸ کاراکتر، فقط انگلیسی) ---
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
    if (!isValid) {
        generalError.textContent = 'لطفاً خطاهای موجود را برطرف کنید.';
        return false; // جلوگیری از ارسال فرم
    }

    return true; // ارسال فرم
}