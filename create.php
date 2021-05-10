<?php

require 'connect.php';
$postdata = file_get_contents('php://input');
if (isset($postdata) && !empty($postdata)) {
    $data = json_decode($postdata, true);

    $titre_article = $data['titre_article'];
    $contenue_article = $data['contenue_article'];
    $statut_article = $data['statut_article'];
    $id_categorie = $data['id_categorie'];
    $tag[] = $data['tags'];

    try{
        $bdd->beginTransaction();

        $stmt= $bdd->prepare('INSERT INTO article(titre_article, contenu_article, statut_article, date_creation_article, date_publication_article, id_categorie) VALUES (:titre, :contenu, :statut, :date_creation, :date_publication, :id_categorie)');
        $req = $stmt->execute([
            "titre"=> $titre_article,
            "contenu"=> $contenue_article,
            "statut"=> $statut_article,
            "date_creation" => date('Y-M-D'),
            "date_publication" => date('Y-M-D'),
            "id_categorie" => $id_categorie
        ]);

        $id_article = $bdd->lastInsertId();

        $stmt = $bdd->prepare('INSERT INTO possede(id_article, id_tag) VALUES (:id_article, :id_tag)');

        foreach ($tag as $id)
        $req = $stmt->execute([
            "id_article" => $id_article,
            "id_tag" => $id
        ]);

        $bdd->commit();
    }
    catch (Exception $e) {
        $bdd -> rollBack();
        echo json_encode([
            "success" => false,
            "msg" => $e->getMessage()
        ]);
    }
}