<?php

require 'connect.php';


$sql = $bdd->prepare("SELECT * FROM categorie");
$sql -> execute();
$results = $sql->fetchAll(PDO::FETCH_ASSOC);
if (count($results) > 0) {

    foreach ($results as $donnees) {
      $categories[] =  $donnees;      
    }
  
    $json = json_encode($categories, JSON_THROW_ON_ERROR);
    echo $json;
  }
  