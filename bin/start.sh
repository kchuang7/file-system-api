#!/bin/bash

FILE=package-lock.json

if test ! -f "$FILE"; then
  echo "$FILE does not exist. Installing dependencies."
  npm i
fi

ROOT_DIR=$1 docker-compose up -d
