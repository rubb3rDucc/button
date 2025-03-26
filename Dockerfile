# syntax=docker/dockerfile:1

FROM node:alpine
WORKDIR /home/node/app
COPY . .
# RUN npm install \ 
#     npm run build
# EXPOSE 3000