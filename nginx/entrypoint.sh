#!/bin/sh

# ------------------------------------------------------------------------------
# entrypoint.sh - NGINX Entrypoint Script
#
# Ce script configure les variables d'environnement et les certificats SSL pour
# NGINX selon l'environnement (développement ou production).
#
# - En mode développement :
#   - Définit SERVER_NAME à "localhost".
#   - Génère un certificat SSL auto-signé si nécessaire dans /etc/nginx/certs/dev.
#   - Définit les chemins des certificats SSL générés.
#
# - En mode production :
#   - Définit SERVER_NAME à "charles-mariot.fr".
#   - Utilise les certificats SSL existants dans /etc/nginx/certs/live/charles-mariot.fr.
#
# Le script utilise ensuite envsubst pour remplacer les variables dans le template
# de configuration NGINX, puis lance le processus passé en argument.
# ------------------------------------------------------------------------------

set -e

if [ "$ENV" = "development" ]; then
    export SERVER_NAME=localhost
    CERT_DIR="/etc/nginx/certs/dev"
    mkdir -p "$CERT_DIR"
    if [ ! -f "$CERT_DIR/fullchain.pem" ] || [ ! -f "$CERT_DIR/privkey.pem" ]; then
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout "$CERT_DIR/privkey.pem" \
            -out "$CERT_DIR/fullchain.pem" \
            -subj "/CN=localhost"
    fi
    export SSL_CERT="$CERT_DIR/fullchain.pem"
    export SSL_KEY="$CERT_DIR/privkey.pem"
else
    export SERVER_NAME=charles-mariot.fr
    export SSL_CERT="/etc/nginx/certs/live/charles-mariot.fr/fullchain.pem"
    export SSL_KEY="/etc/nginx/certs/live/charles-mariot.fr/privkey.pem"
fi

if [ -z "$SECRET_ADMIN_URL" ]; then
    export SECRET_ADMIN_URL="admin"
fi

envsubst '${SERVER_NAME} ${SSL_CERT} ${SSL_KEY} ${SECRET_ADMIN_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
