FROM node:18-alpine

ADD . /app
WORKDIR /app

RUN npm i --omit=dev
RUN npm run sync:db

EXPOSE 23000
CMD npm run start