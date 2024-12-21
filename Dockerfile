FROM node:22.12.0-bullseye

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV MODEL_URL=https://storage.googleapis.com/loadmodels/model-in-prod/model.json

EXPOSE 8080

CMD ["npm", "start"]