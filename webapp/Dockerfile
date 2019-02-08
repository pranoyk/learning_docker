FROM alpine:3.8
COPY . /src/app
WORKDIR /src/app
RUN apk add --update nodejs nodejs-npm
RUN npm install
CMD ["npm", "start"]
