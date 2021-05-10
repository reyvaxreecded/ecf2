<?php

require 'connect.php';

$id = $_GET['id'];


$sql = $bdd->prepare("SELECT * FROM article INNER JOIN categorie ON article.id_categorie = categorie.id_categorie  WHERE id_article = '$id'");
$sql -> execute();
$results = $sql->fetch(PDO::FETCH_ASSOC);
if (count($results) > 0) {
   $article =  $results;      
  echo json_encode($article);
}
?>