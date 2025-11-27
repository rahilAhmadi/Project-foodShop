<?php
require_once "users_manager.php";

// اگر درخواست AJAX بود
if (isset($_POST['ajax'])) {

    if ($_POST['ajax'] === "delete") {
        $id = intval($_POST['id']);
        $ok = delete_user($id);
        echo json_encode(["status" => $ok ? "success" : "error"]);
        exit;
    }

    if ($_POST['ajax'] === "add") {
        $user_name = $_POST['user_name'];
        $full_name = $_POST['full_name'];
        $password = $_POST['password'];
        $role = $_POST['role'];

        $ok = add_user($user_name, $full_name, $password, $role);
        echo json_encode(["status" => $ok ? "success" : "error"]);
        exit;
    }
}

$users = get_all_users();
?>

<div class="users_section">

<header class="ap-header">مدیریت کاربران</header>
            <div class="ap-container">
                <div class="ap-actions">
                    <input type="text" class="ap-input" placeholder="جستجوی کاربر بر اساس نام کاربری..." />
                    <button class="ap-btn ap-btn-primary" >افزودن مدیر جدید</button>
                </div>



                    <!-- فرم افزودن -->
                    <form id="addUserForm" class="addUserForm" style="margin-bottom:20px;">
                        <div class="modal-overlay" id="addAdminModal">
                            <div class="modal">
                                <h2>افزودن کاربر جدید</h2>

                                <label>نام</label>
                                <input type="text" name="full_name" id="newFullname" class="ap-input" placeholder="نام را وارد کنید">

                                <label>نام کاربری</label>
                                <input type="text"  name="user_name" id="newUsername" class="ap-input" placeholder="نام کاربری">

                                <label>رمز عبور</label>
                                <input type="password" name="password" id="newPassword" class="ap-input" placeholder="رمز عبور">

                                <label>نقش</label>
                                <select id="newRole" name="role" class="ap-input">
                                    <option value="1">ادمین</option>
                                    <option value="2">کاربر</option>
                                </select>

                                <div class="modal-actions">
                                    <button type="submit" class="ap-btn ap-btn-primary" id="saveAdmin">ثبت</button>
                                    <button class="ap-btn ap-btn-danger" id="closeModal">انصراف</button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div id="msg"></div>

                    <!-- نمایش کاربران -->
                    <table class="ap-table" id="usersTable">
                        <thead class="ap-table-head">
                            <tr>
                                <th>شناسه</th>
                                <th>نام</th>
                                <th>نام کاربری</th>
                                <th>نقش کاربر</th>
                                <th>عملیات</th>
                            </tr>
                        </thead>

                        <tbody>
                            <?php 
                            $counter=0;
                            while ($u = mysqli_fetch_assoc($users)): ?>
                                <tr id="user-<?= $u['user_ID'] ?>">
                                    <td><?=  $counter; ?></td>
                                    <td><?= $u['full_Name'] ?></td>
                                    <td><?= $u['user_Name'] ?></td>
                                    <td><?= $u['role_ID']=== "1" ? "ادمین" : "کاربر" ?></td>
                                    <td>
                                        <button class="ap-btn ap-btn-danger deleteUser"  data-id="<?= $u['user_ID'] ?>" data-id="<?= $u['user_ID'] ?>">
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            <?php endwhile; ?>
                        </tbody>
                    </table>
            </div>
</div>
<!-- فایل JS جدا -->
<script src="../js/users.js"></script>
