#!/bin/bash

# exit immediately if a command exits with a non-zero status
set -e

# Define some environement variables
export IMAGE_NAME="frontend"
export BASE_DIR=$(pwd)

# Build the image based on the Dockerfile
docker build -t $IMAGE_NAME -f Dockerfile .

# Run the container
# docker run --rm --name $IMAGE_NAME -ti \
# --mount type=bind,source="$BASE_DIR",target=/app \
# -p 8000:8000 \
# -e DEV=1 $IMAGE_NAME

docker run -p 3000:3000 $IMAGE_NAME