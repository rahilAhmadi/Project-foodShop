const form = document.querySelector(".form_food");
const imageInput = document.getElementById("image");
const imagePreview = document.getElementById("imagePreview");
const priceInput = document.getElementById("price");

// تابع کمکی برای تبدیل اعداد فارسی به انگلیسی
function persianToEnglishNumbers(str) {
return str.replace(/[۰-۹]/g, d => String(d.charCodeAt(0) - 0x06F0));
}

// پیش‌نمایش تصویر
imageInput.addEventListener("change", function() {
const file = this.files[0];
if (file) {
const reader = new FileReader();
reader.onload = function(e) {
imagePreview.src = e.target.result;
imagePreview.style.display = "block";
}
reader.readAsDataURL(file);
} else {
imagePreview.src = "";
imagePreview.style.display = "none";
}
});

// فرمت خودکار قیمت هنگام ترک فیلد
priceInput.addEventListener("blur", () => {
let value = priceInput.value.trim();
value = value.replace(/\s*تومان\s*$/i, "");        // حذف تومان قبلی
value = persianToEnglishNumbers(value);             // تبدیل اعداد فارسی به انگلیسی
value = value.replace(/[^0-9]/g, "");               // حذف هر چیزی غیر عدد
if (value) {
priceInput.value = Number(value).toLocaleString("fa-IR") + " تومان";
}
});

//اعتبار سنجی و ارسال فرم 

form.addEventListener("submit", function(e) {
e.preventDefault();
const fields = [
    { input: document.getElementById("name"), error: document.getElementById("nameError"), type: "persian" },
    { input: document.getElementById("description"), error: document.getElementById("descriptionError"), type: "persian" },
    { input: document.getElementById("price"), error: document.getElementById("priceError"), type: "number" },
    { input: document.getElementById("image"), error: document.getElementById("imageError"), type: "image" }
];

const persianRegex = /^[\u0600-\u06FF\s]+$/;
const numberRegex = /^[0-9]+$/;
const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;

let valid = true;

// پاک کردن پیام‌ها و کلاس خطا
fields.forEach(f => {
    f.error.textContent = "";
    f.input.classList.remove("input-error");
});

// اعتبار سنجی فیلد ها

fields.forEach(f => {
    let value = f.input.value.trim();

    if (f.type === "persian") {
        if (!value) {
            f.error.textContent = "این فیلد را وارد کنید.";
            f.input.classList.add("input-error");
            valid = false;
        } else if (!persianRegex.test(value)) {
            f.error.textContent = "فقط حروف فارسی مجاز است.";
            f.input.classList.add("input-error");
            valid = false;
        }
    }

    if (f.type === "number") {
      let rawValue = persianToEnglishNumbers(value); // تبدیل اعداد فارسی به انگلیسی
      rawValue = rawValue.replace(/تومان/g, "")
                         .replace(/[^0-9]+/g, ""); // حذف همه چیز غیر عدد
  
      if (!rawValue) {
          f.error.textContent = "این فیلد را وارد کنید.";
          f.input.classList.add("input-error");
          valid = false;
      } else if (!/^\d+$/.test(rawValue)) {
          f.error.textContent = "فقط عدد مجاز است.";
          f.input.classList.add("input-error");
          valid = false;
      } else {
          const priceNum = parseInt(rawValue, 10);
          if (priceNum < 10000 || priceNum > 500000) {
              f.error.textContent = "قیمت باید بین 10,000 تا 500,000 تومان باشد.";
              f.input.classList.add("input-error");
              valid = false;
          } else {
            //   f.input.value = Number(priceNum).toLocaleString("fa-IR") + " تومان";
              
               f.input.value = priceNum;
              f.error.textContent = "";
              f.input.classList.remove("input-error");
          }
      }
  }
  
    if (f.type === "image") {
            const file = f.input.files[0];

            // اگر کاربر در حالت "ویرایش" بود، نیاز نیست عکس جدید وارد کند
            const isEditMode = document.querySelector("input[name='food_id']") !== null;

            if (!file && !isEditMode) {
                f.error.textContent = "یک تصویر انتخاب کنید.";
                f.input.classList.add("input-error");
                valid = false;
            } else if (file && !imageRegex.test(file.name)) {
                f.error.textContent = "فرمت تصویر معتبر نیست.";
                f.input.classList.add("input-error");
                valid = false;
            }
        }
    });


if (valid) {
     form.submit();
    // alert("غذای جدید با موفقیت به منو اضافه شد!");
    form.reset();

    // پاک کردن پیش‌نمایش تصویر
    imagePreview.src = "";
    imagePreview.style.display = "none";

    // پاک کردن کلاس‌های خطا
    fields.forEach(f => f.input.classList.remove("input-error"));
}
});
