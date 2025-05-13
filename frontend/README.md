# Gamerz

## Un projet en Node.js et React.js par Juliette et Quentin

Ce projet est déployé à l'adresse suivante : https://gamerz-js-qd-front.onrender.com/

Il est aussi possible de le déployer en local, en ajouter des fichiers .env à la racine des répertoires backend et frontend.

L’objectif est de mettre en place une plateforme privée où des joueurs peuvent échanger en temps réel autour de leurs jeux favoris et trouver facilement des coéquipiers. Pour garantir un environnement sain et motivant, chaque joueur devra soumettre une candidature et être validé par un administrateur avant de pouvoir accéder aux salons de discussion.

# stack technique

Le back repose sur du node.js en express.js. La gestion des cookies et de la sécurité se fait avec du jwt et du bcrypt. La base de donnée est en no-SQL, nous avons utilisé mongoDB-atlas et mongoose.

Le front est fait en vite (react.js) et en typescript. On utilise zod pour la validation, couplé à react-hook-form. Le CSS est fait à l'aide de tailwind.

# l'organisation du projet

Avant de coder, nous avons réalisé différents schémas que vous retrouverez directement sur Simplonline. Nous avons ensuite travaillé soit seuls, soit en pair-programming, en fonction des situations. Nous avons créé des branches pour chaque petite fonctionnalité, l'un de nous deux travaillait sur une de ses branches puis nous nous entendions avant de merger.

Enfin, nous avons essayé de faire des commits réguliers et atomiques.

# l'authentification

Elle repose sur des cookies Http-only. Les utilisateurs connectés peuvent avoir trois types de rôles : "user", "gamer" et "adminé". Certaines informations ne sont accessibles qu'à certains types de rôle (ex : pour accéder aux salons, il faut être au moins user, pour écrire dans un salon il faut être au moins gamer, pour supprimer un message dans un salon il faut être admin).


Pour se connecter en admin, vous pouvez utiliser l'email "quentin@gmail.com" et le mot de passe "password".

# les salons de chat

Encore en cours de développement.

# le déploiement

Nous avons déployé l'application avec Render, d'abord le backend sous forme de web-service, puis le frontend sour forme de static website. Nous nous sommes appuyés sur l'infrastructure de Github et de Render, et avons rentré les variables d'environnement directement dans Render. Nous avons dû retravailler le paramétrage des routes de react via render.

## Merci et bonne correction