FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./start.sh /usr/local/bin
RUN chmod +x /usr/local/bin/start.sh

ENTRYPOINT ["start.sh"]