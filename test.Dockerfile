# syntax=docker/dockerfile:1

FROM node:alpine
WORKDIR /home/node/app
COPY . .
RUN npm ci
RUN npm run build
# EXPOSE 3000