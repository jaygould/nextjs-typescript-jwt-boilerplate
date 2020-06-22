FROM node:12.12.0-alpine

WORKDIR /home/app/api

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]
