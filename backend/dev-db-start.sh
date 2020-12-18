#!/bin/bash

if [ ! "$(docker ps -q -f name=postgres)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=postgres)" ]; then
        echo -e "\e[93mStarting existing postgres image"
        docker start postgres;
    else
        echo -e "\e[93mCreating postgres instance"
        docker run --name postgres -e POSTGRES_PASSWORD=rootPassword -d -p 5432:5432 postgres
    fi
else
  echo -e "\e[32mPostgres instance is already running";
fi