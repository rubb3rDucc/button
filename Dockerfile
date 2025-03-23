# syntax=docker/dockerfile:1

FROM node:alpine
WORKDIR /home/node/app
COPY . ./
RUN npm install
EXPOSE 3000