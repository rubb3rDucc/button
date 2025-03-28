## desc

overkill button counter

## preview

![alt text](./readme-assets/pics/preview_img.png "Logo Title Text 1")
<sup><sub>i hate readmes without pics showing what the program looks like</sub></sup>

## stack

TypeScript, Express, PostgreSQL, HTML/CSS, Docker, Cloud Run, Cloud SQL, Google Cloud (for cloud deployment), Jest, <\insert trendy technology\>

## deployed here on Google Cloud

https://button-server-538186000397.us-east4.run.app/


## how to develop

```bash
npm install
npm run dev
# starts nodemon and watches for changes in /src
```

## how to test

```bash
npm run test
```

## how to run docker

- for regular docker
```bash
docker build -t button-server -f Dockerfile .
docker run --expose 80 --name server-1 button-server 
```

- for docker compose
```bash
docker-compose -f docker-compose.base.yml build
docker-compose -f docker-compose.base.yml up -d
```

## how to use (locally)
- create a pqsql db
- copy env.template to a new .env file with db credentials
- run this cmd in dir root

```bash
npm install # if you haven't alr 
npm run build
npm run start
```
- navigate to http://localhost:3000

