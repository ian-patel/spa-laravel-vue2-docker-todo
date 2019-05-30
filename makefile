# Makefile for Docker Nginx PHP Composer MySQL

code-sniff:
	@echo "Checking the standard code..."
	@docker-compose exec -T app ./app/vendor/bin/phpcs -v --standard=PSR2 app

setup:
	@echo "Installing packages..."
	composer install
	cp .env.example .env
	docker-compose up -d --force-recreate
	docker-compose exec app php artisan key:generate
	docker-compose exec app php artisan jwt:secret
	@echo " Application has setup successfully."
	@echo " To setup the database run:"
	@echo "$ make setup-database"

setup-database:
	@docker-compose exec app php artisan migrate
	@docker-compose exec app php artisan db:seed

docker-start:
	@echo "Starting application ..."
	docker-compose up -d
	@echo " 🐳  Docker started   🐳"
	@echo "🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻"
	@echo "       http://localhost:8003/   "
	@echo "🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻🍻"

docker-stop:
	@echo "Closing application ..."
	@docker-compose down -v
	@echo " 🐳  Docker down   🐳"

artisan:
	@docker-compose exec app php artisan

tinker:
	@docker-compose exec app php artisan tinker

phpunit:
	@docker-compose exec app ./vendor/bin/phpunit