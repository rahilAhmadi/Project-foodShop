const form = document.getElementById('form');
const nameInput = document.getElementById('name_user_rigister');
const userInput = document.getElementById('input_user');
const passInput = document.getElementById('input_pass');
const togglePassword = document.querySelector('.toggle');

const messageBox = document.getElementById("message");
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");

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

function validateName() {
    const nameValue = nameInput.value.trim();
    const nameRegex =/^[\u0600-\u06FF\s]{2,50}$/;
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

function validateUsername() {
    const userValue = userInput.value.trim();
    const usernameRegex = /^[a-zA-Z0-9_.-]{5,10}$/; 

    if (userValue === '') {
        setError(userInput, 'پر کردن نام کاربری الزامی است.');
        return false;
    } else if (userValue.length < 5 || userValue.length > 10) { 
        setError(userInput, 'نام کاربری باید بین5 تا 10 کاراکتر باشد.'); 
        return false;
    } else if (!usernameRegex.test(userValue)) {
        setError(userInput, 'نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد، _ و . باشد.');
        return false;
    } else {
        setSuccess(userInput);
        return true;
    }
}

function validatePassword() {
    const passValue = passInput.value;
    let isValid = true;
    
    const overallRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if (passValue === '') {
        setError(passInput, 'پر کردن رمز عبور الزامی است.');
        isValid = false;
    } else if (!overallRegex.test(passValue)) {
        setError(passInput, 'رمز عبور ضعیف یا نامعتبر است. راهنما را ببینید.');
        isValid = false;
    } else {
        setSuccess(passInput);
        isValid = true;
    }
    
    updatePasswordHelpMessage(passValue);

    return isValid;
}


function updatePasswordHelpMessage(value) {
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const minLength = 8;
    if(value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    if(value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    if(value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    if(value.length >= minLength) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
}

form.addEventListener('submit', (e) => {
    const isNameValid = validateName();
    const isUserValid = validateUsername();
    const isPassValid = validatePassword();
    
    if (!isNameValid || !isUserValid || !isPassValid) {
        e.preventDefault(); 
    }
});


nameInput.addEventListener('blur', validateName);
userInput.addEventListener('blur', validateUsername);
passInput.addEventListener('blur', validatePassword);


passInput.addEventListener('focus', () => {
    messageBox.style.display = "block";
});

passInput.addEventListener('blur', () => {
    if (passInput.value.trim() !== '') {
        messageBox.style.display = "none";
    }
});

passInput.addEventListener('keyup', () => {
    updatePasswordHelpMessage(passInput.value);
});


togglePassword.addEventListener('click', function (e) {
    const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passInput.setAttribute('type', type);
    const formControl = togglePassword.parentElement;
    if (type === 'text') {
        formControl.classList.add('hide');
    } else {
        formControl.classList.remove('hide');
    }
});
