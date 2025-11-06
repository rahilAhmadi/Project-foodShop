const form = document.querySelector(".form_food");
const imageInput = document.getElementById("image");
const imagePreview = document.getElementById("imagePreview");

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

form.addEventListener("submit", function (e) {
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

  // پاک کردن خطاهای قبلی
  fields.forEach(f => {
    f.error.textContent = "";
    f.input.classList.remove("input-error");
  });

  fields.forEach(f => {
    const value = f.input.value.trim();
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
      if (!value) {
        f.error.textContent = "این فیلد را وارد کنید.";
        f.input.classList.add("input-error");
        valid = false;
      } else if (!numberRegex.test(value)) {
        f.error.textContent = "فقط عدد مجاز است.";
        f.input.classList.add("input-error");
        valid = false;
      } else {
        const priceNum = parseInt(value, 10);
        if (priceNum < 250000 || priceNum > 1000000) {
          f.error.textContent = "قیمت باید بین 250,000 تا 1,000,000 تومان باشد.";
          f.input.classList.add("input-error");
          valid = false;
        }
      }
    }

    if (f.type === "image") {
      const file = f.input.files[0];
      if (!file) {
        f.error.textContent = "یک تصویر انتخاب کنید.";
        f.input.classList.add("input-error");
        valid = false;
      } else if (!imageRegex.test(file.name)) {
        f.error.textContent = "فرمت تصویر معتبر نیست (jpg, png, gif, bmp).";
        f.input.classList.add("input-error");
        valid = false;
      }
    }
  });

  if (valid) {
    alert("غذای جدید با موفقیت به منو اضافه شد!");
      form.reset();

    // پاک کردن پیش‌نمایش تصویر
    imagePreview.src = "";
    imagePreview.style.display = "none";

    // پاک کردن کلاس‌های خطا
    fields.forEach(f => f.input.classList.remove("input-error"));
    // form.submit();
  }
});
