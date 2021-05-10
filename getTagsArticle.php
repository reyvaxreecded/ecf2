<?php

require 'connect.php';

$id = $_GET['id'];
$sql = $bdd->prepare("SELECT * FROM possede INNER JOIN tag ON possede.id_tag = tag.id_tag WHERE id_article = $id");
$sql -> execute();
$results = $sql->fetchAll(PDO::FETCH_ASSOC);
if (count($results) > 0) {

    foreach ($results as $donnees) {
      $article[] =  $donnees;      
    }
  
    $json = json_encode($article, JSON_THROW_ON_ERROR);
    echo $json;
  }
  