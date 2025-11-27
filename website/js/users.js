// document.addEventListener("DOMContentLoaded", () => {

//     const addAdminModal = document.getElementById("addAdminModal");
//     const addUserButton = document.querySelector(".ap-btn-primary");
//     const closeModal = document.getElementById("closeModal");
//     const addUserForm = document.getElementById("addUserForm");

//     // نمایش مودال
//     addUserButton.addEventListener("click", () => {
//         addAdminModal.style.display = "flex";
//     });

//     // بستن مودال
//     closeModal.addEventListener("click", (e) => {
//         e.preventDefault(); // جلوگیری از سابمیت فرم
//         addUserForm.reset(); // پاک کردن اطلاعات
//         addAdminModal.style.display = "none";
//     });


//     // جلوگیری از بسته نشدن مودال با کلیک روی داخل
//     addAdminModal.querySelector(".modal-content").addEventListener("click", (e) => {
//         e.stopPropagation();
//     });

//     // بستن مودال با کلیک روی پس‌زمینه
//     addAdminModal.addEventListener("click", () => {
//         addUserForm.reset();
//         addAdminModal.style.display = "none";
//     });

//     // ارسال فرم
//     addUserForm.addEventListener("submit", function (e) {
//         e.preventDefault();

//         let formData = new FormData(addUserForm);

//         fetch("addUser.php", {
//             method: "POST",
//             body: formData
//         })
//         .then(res => res.text())
//         .then(data => {

//             // نمایش پیام در کنسول
//             console.log("Server:", data);

//             // اگر موفق بود
//             if (data.includes("success")) {
//                 alert("کاربر با موفقیت ایجاد شد");

//                 addUserForm.reset();        // پاک کردن فرم
//                 addAdminModal.style.display = "none"; // بستن مودال

//                 // رفرش لیست کاربران (اگه نیاز داری)
//                 if (typeof loadUsers === "function") {
//                     loadUsers();
//                 }
//             } else {
//                 alert("خطا: " + data);
//             }
//         });
//     });

// });


// //پر بودن همه فیلد ها
// saveAdmin.addEventListener("click", () => {

//     const fullname = document.getElementById("newFullname").value.trim();
//     const username = document.getElementById("newUsername").value.trim();
//     const password = document.getElementById("newPassword").value.trim();
//     const role = document.getElementById("newRole").value === "admin" ? "ادمین" : "کاربر";

//     if (!fullname || !username || !password) {
//         alert("لطفاً همه فیلدها را پر کنید");
//         return;
//     }

// });

//بخش جستجو
const searchInput = document.querySelector(".ap-input");
const rows = document.querySelectorAll("tbody tr");

searchInput.addEventListener("keyup", function () {
    const value = this.value.toLowerCase().trim();

    rows.forEach(row => {
        const username = row.children[2].textContent.toLowerCase();   // نام کاربری
        const fullname = row.children[1].textContent.toLowerCase();   // نام کامل
        const id = row.children[0].textContent.toLowerCase();         // شناسه

        // اگر در هرکدام از فیلدها پیدا شود، نمایش داده می‌شود
        if (
            username.includes(value) ||
            fullname.includes(value) ||
            id.includes(value)
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {

    const addAdminModal = document.getElementById("addAdminModal");
    const addUserButton = document.querySelector(".ap-btn-primary");
    const closeModal = document.getElementById("closeModal");
    const addUserForm = document.getElementById("addUserForm");
    const usersTableBody = document.getElementById("usersTable").querySelector("tbody");
    const msg = document.getElementById("msg");

    addUserButton.addEventListener("click", () => {
        addAdminModal.style.display = "flex";
    });

    closeModal.addEventListener("click", (e) => {
        e.preventDefault();
        addAdminModal.style.display = "none";
        addUserForm.reset();
    });

    addUserForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const full_name = document.getElementById("newFullname").value.trim();
        const user_name = document.getElementById("newUsername").value.trim();
        const password = document.getElementById("newPassword").value.trim();
        const role = document.getElementById("newRole").value;

        if (!full_name || !user_name || !password) {
            alert("لطفاً همه فیلدها را پر کنید.");
            return;
        }

        const formData = new FormData();
        formData.append("ajax", "add");
        formData.append("full_name", full_name);
        formData.append("user_name", user_name);
        formData.append("password", password);
        formData.append("role", role);

        try {
            const response = await fetch("../admin/users.php", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.status === "success") {
                addAdminModal.style.display = "none";
                addUserForm.reset();

                // ایجاد ردیف جدید
                const newRow = document.createElement("tr");
                newRow.id = `user-${data.user_id}`;
                newRow.innerHTML = `
                  <td></td>
                  <td>${full_name}</td>
                  <td>${user_name}</td>
                  <td>${role == "1" ? "ادمین" : "کاربر"}</td>
                  <td>
                    <button class="ap-btn ap-btn-danger deleteUser" data-id="${data.user_id}">
                      حذف
                    </button>
                  </td>
                `;
                usersTableBody.appendChild(newRow);

                updateRowNumbers();
            } else {
                alert("خطا در افزودن کاربر!");
            }
        } catch (error) {
            alert("خطا در ارسال درخواست!");
            console.error(error);
        }
    });

    function updateRowNumbers() {
        const rows = usersTableBody.querySelectorAll("tr");
        rows.forEach((row, index) => {
            row.querySelector("td:first-child").textContent = index + 1;
        });
    }

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("deleteUser")) {
            const id = e.target.getAttribute("data-id");

            const form = new FormData();
            form.append("ajax", "delete");
            form.append("id", id);

            fetch("../admin/users.php", {
                method: "POST",
                body: form
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    document.getElementById(`user-${id}`).remove();
                    updateRowNumbers();
                }
            });
        }
    });

    // اگر جدول اول شماره ندارد، شماره‌ها را به روز کن
    updateRowNumbers();

});
