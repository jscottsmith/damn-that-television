FROM node:6

# RUN npm install webpack -g

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/

# ENV NODE_ENV=development
# ENV PORT=3000

# Running these here fails, because the DB is not up
# RUN npm run db:migrate
# RUN npm run db:seed:all

# These are being run in the compose.yml instead
# RUN npm run dev
# RUN npm run prod

# RUN echo $PWD

# # CMD [ "/usr/local#/bin/node", "./index.js" ]

# EXPOSE 3000
