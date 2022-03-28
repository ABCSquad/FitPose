FROM node:16.5.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env.production .env

RUN npm run build

ENV NODE_ENV production

EXPOSE 8080
CMD ["node", "dist/index.js"]
USER node