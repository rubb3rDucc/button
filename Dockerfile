# syntax=docker/dockerfile:1

FROM node:alpine
# FROM gcr.io/google.com/cloudsdktool/google-cloud-cli:alpine
# RUN apk add --update nodejs npm
WORKDIR /home/node/app
COPY . .
RUN npm ci
RUN npm run build
# EXPOSE 3000
CMD [ "npm","run","start" ]