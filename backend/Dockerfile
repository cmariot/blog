# /backend/Dockerfile

# Use a lightweight Python image
FROM python:3.13-bullseye

# Set environment variables to ensure Python outputs are directed to the console and no bytecode files are generated
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Set the working directory for the container
WORKDIR /app/backend

# Copy the Python dependency file into the container
COPY requirements.txt .

# Install system dependencies required for GeoDjango, including compilation dependencies and geospatial libraries
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        gcc \
        musl-dev \
        libpq-dev \
        python3-dev \
        libgeos-dev \
        gdal-bin \
        libgdal-dev \
        proj-bin \
        binutils \
        postgresql-client && \
    pip install --no-cache-dir -r requirements.txt && \
    apt-get remove --purge -y gcc musl-dev python3-dev && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy the entire project into the container
COPY app .

# Copy the wait-for-postgres.sh script into the container and make it executable
COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh

# Copy the entrypoint.sh script into the container and make it executable
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set the container's entrypoint to the entrypoint.sh script
ENTRYPOINT ["/entrypoint.sh"]
