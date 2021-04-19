FROM node:12

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY . .

EXPOSE 5001

CMD [ "npm", "start" ]