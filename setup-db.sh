#!/bin/bash

echo "Setup DB"

npm run db:migrate
npm run db:seed:all
