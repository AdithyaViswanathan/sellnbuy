FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --save

COPY . .

EXPOSE 3000

CMD ["npm", "start"]