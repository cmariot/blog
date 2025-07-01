#!/bin/sh

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

envsubst '${SERVER_NAME} ${SSL_CERT} ${SSL_KEY}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
