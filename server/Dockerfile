FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env.production .env

RUN npm run build

EXPOSE 8080
CMD ["node", "dist/index.js"]
USER node