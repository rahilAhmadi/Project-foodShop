<?php

 function Show_foods($type)
 {
    $connect = mysqli_connect('localhost', 'root', '', 'daspokht');
    $sql = 'SELECT * FROM `foods` WHERE `Type`="'.$type.'"';
    $query = mysqli_query($connect, $sql);
    return $query;


 }

 function Select_food($id)
 {
    $connect = mysqli_connect('localhost', 'root', '', 'daspokht');
    $sql = 'SELECT * FROM `foods` WHERE `food_ID`="'.$id.'"';
    $query = mysqli_query($connect, $sql);
    return $query;
 }

 function Delete_food($id)
 {
    $row=mysqli_fetch_array(Select_food($id));
    $connect = mysqli_connect('localhost', 'root', '', 'daspokht');
    $sql = 'DELETE FROM `foods` WHERE `food_ID`="'.$id.'"';
    $query = mysqli_query($connect, $sql);

    $file_path="../asset/img/FoodsImage/".$row['img_url'];
    if (file_exists($file_path))
         {
            unlink($file_path);
         }

    

    return $query;

 }

  function Avalible_food($id,$status)
 {
    $connect = mysqli_connect('localhost', 'root', '', 'daspokht');
    $sql = 'UPDATE `foods` SET `available`='.$status.' WHERE `food_ID`="'.$id.'"';
    $query = mysqli_query($connect, $sql);
    return $query;

 }


?>