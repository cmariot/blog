up:
	docker compose up --build

down:
	docker compose down

build:
	docker compose build

restart:
	docker compose down
	docker compose up -d

logs:
	docker compose logs -f

ps:
	docker compose ps

shell-backend:
	docker compose exec backend sh

shell-frontend:
	docker compose exec frontend sh

shell-db:
	docker compose exec database sh

shell-nginx:
	docker compose exec reverse_proxy sh

clean:
	docker compose down -v --remove-orphans
	rm -f ./nginx/conf.d/default.conf
	rm -rf ./nginx/certbot/www

fclean: clean
	docker system prune -af
	docker volume prune -f
	rm -rf ./database/data

re: fclean build up

dev:
	docker compose up --build

prod:
	docker compose -f docker-compose.yaml up --build

.PHONY: up down build restart logs ps shell-backend shell-frontend shell-db clean fclean re dev prod
