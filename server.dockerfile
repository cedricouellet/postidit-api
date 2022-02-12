FROM node:14

WORKDIR /postidit-api

COPY package.json .
COPY . .

RUN npm install

CMD ["npm", "run", "watch"]