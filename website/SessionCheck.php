<?php

$timeout_seconds = 30*60;

if (isset($_SESSION['last_activity'])) 
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
    header("Location: login.php");
    exit;
    }

?>