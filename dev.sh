#!/bin/bash

# docker-compose up

# Run in the backround
docker-compose up -d

# Need to migrate/seed DB after starting containers
# This can be done by running the setup-db.sh
# script, but I'm not quite sure how to exec

# To get around this, after starting composing up
# get a bash of the web container and run the migrate
# and seed npm scripts or the setup script manually

# CURRENT_DIR=${PWD##*/}
# dockerName=${CURRENT_DIR//[^a-zA-Z0-9]/}
# containerId=$(docker ps -a | grep "${dockerName}_db" | awk '{ print $1 }')
# echo "Running ./setup-db.sh on DB container [${containerId}] for $dockerName"
# eval "docker exec -it $containerId ./setup-db.sh"
