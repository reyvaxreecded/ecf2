<?php
require 'connect.php';

$article = [];
$sql = $bdd->prepare("SELECT * FROM article INNER JOIN categorie ON article.id_categorie = categorie.id_categorie");
$sql -> execute();
$results = $sql->fetchAll(PDO::FETCH_ASSOC); 

if (count($results) > 0) {

  foreach ($results as $donnees) {
    $article[] =  $donnees;      
  }

  $json = json_encode($article, JSON_THROW_ON_ERROR);
  echo $json;
}
