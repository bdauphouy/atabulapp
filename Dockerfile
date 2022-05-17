FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . ./

RUN npm run build
EXPOSE 3000

RUN npm run build-storybook

RUN mv storybook-static ./public

CMD npm start