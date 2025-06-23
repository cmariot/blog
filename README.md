# Créer la base d’une application web avec Next.js, Django, PostgreSQL et NGINX (2025)

> Monorepo modulaire, dockerisé, prêt pour le développement local et facilement déployable.

---

## ⚙️ Objectif

Mettre en place une architecture web moderne, fullstack, avec séparation claire des responsabilités :

- **Next.js** (frontend)
- **Django** (backend REST/API)
- **PostgreSQL** (base de données)
- **NGINX** (reverse proxy)
- **Docker Compose** (orchestration)
- **Monorepo** (un seul repo pour tout centraliser)

---

## 📁 Structure du monorepo

```
.
├── backend/                # Code Django + Dockerfile
│   ├── app/                # Projet Django (manage.py, apps, etc.)
│   ├── .env
│   ├── Dockerfile
│   ├── entrypoint.sh
│   ├── requirements.txt
│   └── wait-for-postgres.sh
│
├── frontend/               # App Next.js + Dockerfile
│   ├── app/
│   └── Dockerfile
│
├── database/               # Données persistées PostgreSQL
│   ├── .env
│   └── data/
│
├── nginx/                  # Config NGINX + Dockerfile
│   ├── Dockerfile
│   └── conf.d/
│
├── .env                    # Variables d’environnement globales
├── docker-compose.yaml     # Déclaration des services
├── Makefile
└── README.md
```

---

## 📝 Configuration des fichiers `.env`

Le backend et la base de données nécessitent un fichier `.env` pour fonctionner correctement. Voici comment les créer :

### 1. `.env` à la racine

Ce fichier peut contenir des variables globales partagées entre les services.

Exemple :
```
PROJECT_NAME=blog
POSTGRES_HOST=database
POSTGRES_PORT=5432
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db_name
```

### 2. `backend/.env`

Contient la configuration Django et la connexion à la base de données.

Exemple :
```
POSTGRES_HOST=database
POSTGRES_PORT=5432
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db_name
SECRET_KEY=change_me
```

### 3. `database/.env`

Contient la configuration de la base PostgreSQL.

Exemple :
```
POSTGRES_HOST=database
POSTGRES_PORT=5432
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db_name
SECRET_KEY=change_me
```

**Astuce :**
Ne versionne jamais tes fichiers `.env` contenant des secrets. Utilise le fichier `.gitignore` pour les exclure du dépôt.

---

## 🐳 Architecture Docker Compose

Chaque service est isolé dans son propre container :

### 1. PostgreSQL
- Image alpine légère
- Volumes persistants (`database/data`)
- Healthcheck actif
- Accès **limité au backend uniquement**

### 2. Django (backend)
- API accessible via `/api/`
- Connecté uniquement à la base de données
- Sert les fichiers statiques pour l’admin (`collectstatic`)
- **Pas exposé directement** : accessible uniquement via NGINX

### 3. Next.js (frontend)
- Sert le client React
- Accès via le port 80 de NGINX
- Fait ses appels API via `/api/` → proxy_pass vers Django

### 4. NGINX (reverse proxy)
- Route les requêtes :
  - `/api/` → Django
  - `/static/` → fichiers statiques Django
  - `/` → Next.js
- Point d’entrée unique exposé sur `localhost:8080`

---

## 🔐 Sécurité (niveau réseau)

- **Base de données** : non exposée, seulement le backend y accède
- **Backend** : non exposé, uniquement disponible via NGINX
- **Frontend** : exposé via le reverse proxy
- **NGINX** : point d’entrée unique, à sécuriser (SSL, headers, etc.)

---

## 📦 Collecte des fichiers statiques Django

1. Définir `STATIC_URL` et `STATIC_ROOT` dans `backend/app/backend/settings.py`
2. Exécuter : `python manage.py collectstatic` dans `backend/app/`
3. Partager `/staticfiles` entre Django et NGINX via un volume Docker
4. NGINX gère `/static/` avec un `alias`

---

## 🔗 Accès à Django admin

- Le backend est accessible via `/api/`
- L’admin Django est monté sur `/api/admin/`
- Si le CSS/admin ne s'affiche pas → problème de static non servi → corrigé via `location /static/` dans NGINX

---

## 🔧 Exemple de config NGINX

```nginx
upstream frontend {
    server frontend:3000;
}

upstream backend {
    server backend:8000;
}

server {
    listen 80;
    server_name localhost;

    location /api/ {
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://backend/;

        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
        add_header Access-Control-Allow-Headers "Authorization, Content-Type";
    }

    location / {
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://frontend$request_uri;
    }

    location /static/ {
        alias /staticfiles/;
    }
}
```

---

## 🔁 Volumes

- `backend/staticfiles` partagé avec NGINX
- `database/data` pour PostgreSQL
- `frontend/node_modules` pour éviter des conflits entre hôtes

---

## ✅ Avantages de cette architecture

- Isolation claire des services
- Dev & prod unifiés via Docker
- Sécurité interservices
- Réseau Docker + NGINX
- Facilité de scaling / déploiement
- Backend et frontend indépendants
- Stack moderne : Python côté serveur, React côté client
- Monorepo pour centraliser
- Pas de microservices prématurés

---

## 🚀 Étapes suivantes possibles

- Ajouter un système d’authentification JWT
- Protéger l’accès API avec des tokens d’accès et de rafraîchissement
- Configurer HTTPS via certbot ou Traefik
- Déployer sur un VPS
- Ajouter un pipeline CI/CD (GitHub Actions, etc.)