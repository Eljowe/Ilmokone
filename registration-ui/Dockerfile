FROM node:18

EXPOSE 3000

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY *.json ./

RUN npm install

COPY . .

CMD [ "next", "dev" ]