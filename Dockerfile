FROM node:16-slim

EXPOSE 89

# Запуск проекта
WORKDIR /app
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

CMD [ "node", "index.js" ]
