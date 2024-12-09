#!/bin/sh

# Wait for the database to be ready
echo "Waiting for the database to be ready..."
while ! nc -z db 5432; do  # Replace 'db' and '5432' with your database service name and port
  sleep 1
done
echo "Database is ready!"

# Apply database migrations
echo "Applying database migrations..."
python manage.py makemigrations
python manage.py migrate

# Load initial data
echo "Loading initial data..."
python manage.py loaddata fixtures/english_words.json

# python manage.py create_default_superuser
python manage.py createsuperuser --no-input

python manage.py collectstatic --no-input

# Start the application
echo "Starting the application..."
exec "$@"