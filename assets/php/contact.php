<?php

// Ton email de réception
$destinataire = "henryonastelie@gmail.com";

// Récupération des données
$nom     = htmlspecialchars($_POST['name']);
$email   = htmlspecialchars($_POST['email']);
$message = htmlspecialchars($_POST['message']);

// Sujet du mail
$sujet = "Nouveau message de $nom via le formulaire de contact";

// Contenu du mail
$contenu = "Nom : $nom\n";
$contenu .= "Email : $email\n\n";
$contenu .= "Message :\n$message";

// Headers
$headers = "From: $email" . "\r\n" .
           "Reply-To: $email" . "\r\n" .
           "X-Mailer: PHP/" . phpversion();

// Envoi
if (mail($destinataire, $sujet, $contenu, $headers)) {
  http_response_code(200); // OK
  echo "Message envoyé avec succès";
} else {
  http_response_code(500); // Erreur
  echo "Une erreur est survenue. Veuillez réessayer.";
}

?>
