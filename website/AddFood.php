<?php
$food_Name ="name";
$food_Price =0;
$description ="description";
$image="image";
$type="type";
if( isset($_POST['food_name'])&& !empty($_POST['food_name'])&&
    isset($_POST['food_description'])&& !empty($_POST['food_description'])&&
    isset($_POST['food_price'])&& !empty($_POST['food_price'])&&
    isset($_POST['food_type'])&& !empty($_POST['food_type'])&&
    isset($_FILES['food_image'])&& !empty($_FILES['food_image'])) 
{
    $food_Name=$_POST['food_name'];
    $food_Price=$_POST['food_price'];
    $description=$_POST['food_description'];
    $image=$_FILES['food_image'];
    $type=$_POST['food_type'];

    Uploader();

    echo $food_Name."++".$food_Price."++".$description."++".$image['name']."++".$type;

}
else 
{

    echo "eror";
}

echo"Add food page";
echo"<a href='panel.html#addProduct'>add</a>";


function Uploader()
{
$pic_name=$_FILES['food_image']['name'];
$array=explode(".",$pic_name);
$ext=end($array);
$new_name=rand().".".$ext;
$from=$_FILES['food_image']['tmp_name'];
$to="asset/img/FoodsImage/".$new_name;
move_uploaded_file($from,$to) ;

}

?>