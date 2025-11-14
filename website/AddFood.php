<?php
$food_info="";
$image="image";
if( isset($_POST['food_info'])&& !empty($_POST['food_info'])&&
    isset($_FILES['food_image'])&& !empty($_FILES['food_image'])) 
{
    $food_info=$_POST['food_info'];
    $image_name=Uploader();
    AddFood($food_info,$image_name);


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
    return $new_name;

}

function AddFood($food_info,$image_name)
{

    var_dump($food_info);
    echo $image_name;
    $connect = mysqli_connect('localhost', 'root', '', 'daspokht');
    $sql = 'INSERT INTO foods (food_Name, description, price, img_url) VALUES ("'.$food_info['name'].'","'.$food_info['description'].'","'.$food_info['price'].'","'.$image_name.'")';
    $query = mysqli_query($connect, $sql);
}

?>