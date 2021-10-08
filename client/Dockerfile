FROM node:alpine

WORKDIR /usr/app/goobito

COPY ./package.json ./
RUN npm install
COPY ./src ./src
COPY ./public ./public

CMD ["npm", "start"]
