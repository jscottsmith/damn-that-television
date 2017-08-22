#!/bin/bash

# with console output
# docker-compose up

# Run in the backround
docker-compose up -d

# Migrate and seed the database by running setup-db.sh
CURRENT_DIR=${PWD##*/}
dockerName=${CURRENT_DIR//[^a-zA-Z0-9]/}
containerId=$(docker ps -a | grep "${dockerName}_web" | awk '{ print $1 }')
echo "Running ./setup-db.sh on DB container [${containerId}] for $dockerName"
eval "docker exec -it $containerId ./setup-db.sh"
