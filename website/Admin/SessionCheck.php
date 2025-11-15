<?php
session_start();
$timeout_seconds=20*60 ;

if (isset($_SESSION['admin_login']) ) 
    {
    $inactive = time() - (int)$_SESSION['last_activity'];
    if ($inactive > $timeout_seconds) 
        {
            session_unset();
            session_destroy();
            header("Location: login.html");
        }
    else 
        {

            $_SESSION['last_activity'] = time();
        }
    }

else 
    {
        echo"erro session check";
        header("Location: login.html");
        exit;
    }

?>