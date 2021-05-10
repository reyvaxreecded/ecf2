<?php

require 'connect.php';

$type = htmlspecialchars($_GET['type']);
$value = htmlspecialchars($_GET['value']);

$article = [];
$sql = $bdd->prepare("SELECT * FROM article WHERE $type = '$value'");
$sql -> execute();
$results = $sql->fetchAll(PDO::FETCH_ASSOC);
if (count($results) > 0) {
  
  foreach ($results as $donnees) {
    $article[] =  $donnees;      
  }
  echo json_encode($article);
}
