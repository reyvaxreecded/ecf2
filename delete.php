<?php

require 'connect.php';
$postdata = file_get_contents('php://input');
if (isset($postdata) && !empty($postdata)) {
    $data = json_decode($postdata, true);

    $id_article= $data;
    
    try {
        $bdd->beginTransaction();

        $stmt = $bdd->prepare('DELETE FROM possede WHERE id_article=:id_article');
        $req = $stmt->execute([
            "id_article"=> $id_article
        ]);

        $stmt = $bdd->prepare('DELETE FROM article WHERE id_article=:id_article');
        $req = $stmt->execute([
            "id_article"=> $id_article
        ]);

        $bdd->commit();

        echo json_encode([
            $bdd,
            "msg" => "Article supprimer avec succés"
        ]);
    } catch (Exception $e) {
        $bdd->rollBack();
        echo json_encode([
            "success" => false,
            "msg" => $e->getMessage()
        ]);
    }
}