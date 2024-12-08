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

# Copy project files
COPY . /api/
COPY .env /api/

# Collect static files (only for production)
RUN python manage.py collectstatic --noinput

# Expose the port
EXPOSE 8000

# Run the application
CMD ["gunicorn", "api.wsgi:application", "--bind", "0.0.0.0:8000"]
