<?php
require 'connect.php';

$article = [];
$sql = $bdd->prepare("SELECT * FROM article INNER JOIN categorie ON article.id_categorie = categorie.id_categorie INNER JOIN possede on article.id_article = possede.id_article INNER JOIN tag ON possede.id_tag = tag.id_tag");
$sql -> execute();
$results = $sql->fetchAll(PDO::FETCH_ASSOC); 

if (count($results) > 0) {

  foreach ($results as $donnees) {
    $article[] =  $donnees;      
  }

  $json = json_encode($article, JSON_THROW_ON_ERROR);
  echo $json;
}
