# Wiki Nouvelle Destinée · V1.1.1

En ligne sur https://wiki.nouvelledestinee.fr

Site sans base de données, sans compte et sans tableau de bord. Il suffit d'héberger ces fichiers tels quels.

## Contenu du dossier

- `index.html` : la page d'entrée.
- `js/donnees.js` : tous les textes du wiki (pages, actualités, crédits). C'est le seul fichier à changer pour modifier un texte.
- `js/wiki.js` : l'affichage. Il n'y a rien à y changer pour le contenu.
- `css/`, `fonts/`, `img/` : le design, les polices et les images.
- `CNAME` : relie le site à l'adresse wiki.nouvelledestinee.fr.

## Hébergement

- Le site est publié par GitHub Pages depuis la branche `main`, dossier racine, avec « Enforce HTTPS ».
- Le domaine est géré chez Cloudflare : un enregistrement **CNAME** `wiki` pointe vers `contactnouvelledestinee-hub.github.io`, en « DNS uniquement » (nuage gris). Ne pas activer le proxy orange, sinon GitHub ne peut plus renouveler le certificat HTTPS.
- `404.html` est la page affichée pour une adresse qui n'existe pas.
- `img/apercu-partage.jpg` est l'image qui s'affiche quand on partage un lien du wiki, par exemple sur Discord.

## Modifier un texte

La branche `main` est protégée : on ne peut plus la modifier directement.

1. Ouvrir `js/donnees.js` sur GitHub et cliquer sur le crayon.
2. Modifier le texte entre guillemets.
3. Cliquer sur « Commit changes », choisir « Create a new branch for this commit and start a pull request », puis valider.
4. Sur la pull request, cliquer sur « Merge pull request ».

Le site se met à jour une dizaine de minutes après la fusion, à cause du cache.

Ne jamais mettre de mot de passe, de clé ou de donnée interne dans ce dépôt : il est public.

Format des textes : `## Titre`, `**gras**`, `*italique*`, `- élément de liste`, `[[id-de-page|texte du lien]]`, et les encadrés `:::encadre Titre` … `:::`.

## Droits d'auteur

Ce dépôt est public pour permettre la publication du site, mais son contenu n'est pas libre de droits. Les textes, le code et le design appartiennent à HCF Nouvelle Destinée : toute reproduction ou réutilisation, même partielle, demande son accord écrit. Les illustrations appartiennent à leurs artistes, crédités sur la page Crédits du wiki. Voir le fichier `LICENSE`.
