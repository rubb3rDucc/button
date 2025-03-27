# syntax=docker/dockerfile:1

FROM node:alpine
WORKDIR /home/node/app
COPY . .
RUN npm ci --only=production
RUN npm run build 
EXPOSE 3000
CMD [ "npm","run","start" ]