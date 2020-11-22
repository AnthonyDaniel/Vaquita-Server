FROM node:12.13.1

WORKDIR /

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]