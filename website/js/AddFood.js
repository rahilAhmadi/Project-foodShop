const form = document.querySelector(".form_food");
const imageInput = document.getElementById("image");
const imagePreview = document.getElementById("imagePreview");
const priceInput = document.getElementById("price");

// === توابع کمکی ===
function normalizeNumberOnly(str) {
    if (!str) return "";
    str = String(str);
    // فارسی + عربی -> انگلیسی
    str = str.replace(/[۰-۹]/g, d => String(d.charCodeAt(0) - 0x06F0))
             .replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 0x0660));
    // حذف کاماها، فاصله، تومان، هرچیز غیر عدد
    str = str.replace(/[,،\s]/g, "").replace(/تومان/g, "").replace(/[^0-9]/g, "");
    return str;
}

// Regex برای فیلدهای فارسی: حروف فارسی + اعداد فارسی و انگلیسی + , + ، + . + فاصله
const persianFullRegex = /^[\u0600-\u06FF0-9۰-۹,،\.\s]+$/;
const persianAllowedReplaceRegex = /[^\u0600-\u06FF0-9۰-۹,،\.\s]/g;

// === پیش‌نمایش تصویر ===
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

// === فیلتر بلادرنگ فیلدهای فارسی ===
const persianFields = [
    document.getElementById("name"),
    document.getElementById("description")
].filter(Boolean);

persianFields.forEach(field => {
    field.addEventListener("input", () => {
        const caret = field.selectionStart;
        const before = field.value;
        const cleaned = before.replace(persianAllowedReplaceRegex, "");
        if (cleaned !== before) {
            field.value = cleaned;
            try { field.setSelectionRange(caret - 1, caret - 1); } catch {}
        }
    });

    field.addEventListener("blur", () => {
        field.value = field.value.trim();
    });
});

// === قیمت ===
priceInput.addEventListener("blur", () => {
    const raw = normalizeNumberOnly(priceInput.value);
    if (raw) {
        priceInput.value = Number(raw).toLocaleString("fa-IR") + " تومان";
    } else {
        priceInput.value = "";
    }
});

// === اعتبارسنجی و ارسال فرم ===
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const fields = [
        { input: document.getElementById("name"), error: document.getElementById("nameError"), type: "persian" },
        { input: document.getElementById("description"), error: document.getElementById("descriptionError"), type: "persian" },
        { input: document.getElementById("price"), error: document.getElementById("priceError"), type: "number" },
        { input: document.getElementById("image"), error: document.getElementById("imageError"), type: "image" }
    ];

    const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;
    let valid = true;

    // پاکسازی پیام‌ها
    fields.forEach(f => {
        if (f.error) f.error.textContent = "";
        if (f.input) f.input.classList.remove("input-error");
    });

    fields.forEach(f => {
        if (!f.input) return;
        let value = f.input.value.trim();

        // --- فیلد فارسی ---
        if (f.type === "persian") {
            if (!value) {
                if (f.error) f.error.textContent = "این فیلد را وارد کنید.";
                f.input.classList.add("input-error");
                valid = false;
            } else if (!persianFullRegex.test(value)) {
                if (f.error) f.error.textContent = "فقط حروف فارسی، اعداد فارسی/انگلیسی، کاما/ویرگول و نقطه مجاز است.";
                f.input.classList.add("input-error");
                valid = false;
            }
        }

        // --- فیلد عدد ---
        if (f.type === "number") {
            const rawValue = normalizeNumberOnly(value);
            if (!rawValue) {
                if (f.error) f.error.textContent = "قیمت را وارد کنید.";
                f.input.classList.add("input-error");
                valid = false;
            } else {
                const priceNum = parseInt(rawValue, 10);
                if (isNaN(priceNum)) {
                    if (f.error) f.error.textContent = "قیمت معتبر نیست.";
                    f.input.classList.add("input-error");
                    valid = false;
                } else if (priceNum < 10000 || priceNum > 500000) {
                    if (f.error) f.error.textContent = "قیمت باید بین 10,000 تا 500,000 تومان باشد.";
                    f.input.classList.add("input-error");
                    valid = false;
                } else {
                    f.input.value = priceNum; // عدد نهایی برای ارسال
                }
            }
        }

        // --- فیلد تصویر ---
        if (f.type === "image") {
            const file = f.input.files[0];
            const isEditMode = document.querySelector("input[name='food_id']") !== null;

            if (!file && !isEditMode) {
                if (f.error) f.error.textContent = "یک تصویر انتخاب کنید.";
                f.input.classList.add("input-error");
                valid = false;
            } else if (file && !imageRegex.test(file.name)) {
                if (f.error) f.error.textContent = "فرمت تصویر تایید نمی‌شود.";
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
