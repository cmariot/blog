# NGINX Reverse Proxy – Portfolio

Ce dossier contient la configuration du reverse proxy NGINX pour le portfolio.

## Fonctionnement

- La configuration NGINX utilise un template (`default.conf.template`) avec des variables d’environnement pour s’adapter au mode développement ou production.
- Le script `entrypoint.sh` génère dynamiquement le fichier `default.conf` à partir du template, selon la variable d’environnement `ENV`.
- En mode développement (`ENV=development`), un certificat auto-signé est généré et le serveur écoute sur `localhost`.
- En mode production (`ENV=production`), NGINX utilise les certificats Let’s Encrypt et écoute sur le domaine configuré (`charles-mariot.fr`).

## Certificats SSL

- Les certificats Let’s Encrypt sont stockés dans `nginx/certs`.
- Les challenges ACME sont stockés dans `nginx/certbot/www` (utilisé par Certbot pour la validation).

## Fichiers ignorés

- `default.conf` est généré automatiquement et ignoré par git.
- `certbot/www` contient des fichiers temporaires pour la validation SSL et est ignoré par git.

## Nettoyage

La commande `make clean` supprime les fichiers générés et les volumes Docker associés.

---