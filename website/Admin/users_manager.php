<?php
require_once "db.php";

function get_all_users() {
    global $conn;
    return mysqli_query($conn, "SELECT * FROM users ORDER BY user_ID DESC");
}

function add_user($username, $full_name, $pass, $role) {
    global $conn;
    return mysqli_query($conn, 
        "INSERT INTO `users`(`role_ID`, `full_Name`, `user_Name`, `user_Password`)
         VALUES ('$role','$full_name','$username','$pass')");
}

function delete_user($id) {
    global $conn;
    return mysqli_query($conn, "DELETE FROM users WHERE user_ID=$id");
}
