# Wiki Nouvelle Destinée · V1 statique

Site sans base de données, sans compte et sans tableau de bord. Il suffit d'héberger ces fichiers tels quels.

## Contenu du dossier

- `index.html` : la page d'entrée.
- `js/donnees.js` : tous les textes du wiki (pages, actualités, crédits). C'est le seul fichier à changer pour modifier un texte.
- `js/wiki.js` : l'affichage. Il n'y a rien à y changer pour le contenu.
- `css/`, `fonts/`, `img/` : le design, les polices et les images.
- `CNAME` : relie le site à l'adresse wiki.nouvelledestinee.fr.

## Mettre le site en ligne avec GitHub Pages

1. Sur GitHub, créer un nouveau dépôt **public** nommé `wiki`. Un dépôt privé ne peut pas être publié avec un compte gratuit.
2. Dans le dépôt, cliquer sur « uploading an existing file », puis glisser tout le contenu de ce dossier (pas le dossier lui-même). Valider avec « Commit changes ».
3. Aller dans Settings › Pages. Dans « Source », choisir « Deploy from a branch », branche `main`, dossier `/ (root)`, puis Save.
4. Toujours dans Settings › Pages, écrire `wiki.nouvelledestinee.fr` dans « Custom domain » et enregistrer.

## Relier le domaine chez LWS

1. Dans l'espace client LWS, ouvrir le domaine `nouvelledestinee.fr`, puis « Zone DNS ».
2. Ajouter un enregistrement de type **CNAME** : nom `wiki`, valeur `contactnouvelledestinee-hub.github.io.` (avec le point final si LWS le demande).
3. Supprimer un éventuel ancien enregistrement `wiki` de type A ou CNAME.
4. Attendre la propagation (de quelques minutes à quelques heures), puis cocher « Enforce HTTPS » dans Settings › Pages sur GitHub.

## Modifier un texte

Ouvrir `js/donnees.js` sur GitHub, cliquer sur le crayon, modifier le texte entre guillemets, puis « Commit changes ». Le site se met à jour en une à deux minutes.

Format des textes : `## Titre`, `**gras**`, `*italique*`, `- élément de liste`, `[[id-de-page|texte du lien]]`, et les encadrés `:::encadre Titre` … `:::`.
