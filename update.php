<?php

require 'connect.php';
$postdata = file_get_contents('php://input');
if (isset($postdata) && !empty($postdata)) {
    $data = json_decode($postdata, true);

    $id_article = $data['id_article'];
    $titre_article = $data['titre_article'];
    $contenue_article = $data['contenue_article'];
    $statut_article = $data['statut_article'];
    $id_categorie = $data['id_categorie'];
    $tag = $data['tags'];
    $date_publi = date('Y-m-d');

    try {
        $bdd->beginTransaction();

        $stmt = $bdd->prepare('UPDATE article SET titre_article=:titre,contenu_article=:contenu,statut_article=:statut,date_publication_article=:date_publication,id_categorie=:id_categorie WHERE id_article=:id_article');
        $req = $stmt->execute([
            "id_article"=> $id_article,
            "titre" => $titre_article,
            "contenu" => $contenue_article,
            "statut" => $statut_article,            
            "date_publication" => $date_publi,
            "id_categorie" => $id_categorie
        ]);        

        $stmt = $bdd->prepare('DELETE FROM possede WHERE id_article=:id_article');
        $req = $stmt->execute([
            "id_article"=> $id_article
        ]);

        $stmt = $bdd->prepare('INSERT INTO possede(id_article, id_tag) VALUES (:id_article, :id_tag)');

        foreach ($tag as $id)
            $req = $stmt->execute([
                "id_article" => $id_article,
                "id_tag" => $id
            ]);

        $bdd->commit();

        echo json_encode([
            $bdd,
            "msg" => "Article modifier avec succés"
        ]);
    } catch (Exception $e) {
        $bdd->rollBack();
        echo json_encode([
            "success" => false,
            "msg" => $e->getMessage()
        ]);
    }
}