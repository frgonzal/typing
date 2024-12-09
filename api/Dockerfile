# Base Image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /api

# Install dependencies
COPY requirements.txt /api/
RUN pip install --no-cache-dir -r requirements.txt

# Install Netcat
RUN apt-get update && apt-get install -y netcat-openbsd

# Copy project files
COPY . /api/
# COPY .env /api/

# Collect static files (only for production)
RUN python manage.py collectstatic --noinput

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose the port
EXPOSE 8000

ENTRYPOINT [ "/entrypoint.sh" ]

# Run the application
CMD ["gunicorn", "api.wsgi:application", "--bind", "0.0.0.0:8000"]
