<?php

require 'connect.php';


$sql = $bdd->prepare("SELECT * FROM tag");
$sql -> execute();
$results = $sql->fetchAll(PDO::FETCH_ASSOC);
if (count($results) > 0) {

    foreach ($results as $donnees) {
      $tags[] =  $donnees;      
    }
  
    $json = json_encode($tags, JSON_THROW_ON_ERROR);
    echo $json;
  }
  