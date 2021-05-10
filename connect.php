<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Request-Headers: *");
header("Access control allow mothods");
header("Content-Type: application/json; charset=UTF-8");
try {
    $bdd = new PDO('mysql:host=localhost; dbname=ecf2;charset=UTF8', 'root', ''); 
    $bdd->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
 ?>