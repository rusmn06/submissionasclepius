FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV MODEL_URL=https://storage.googleapis.com/asclepius-models-2024/model-in-prod/model.json

EXPOSE 8080

CMD ["npm", "start"]