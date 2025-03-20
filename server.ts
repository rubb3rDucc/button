const express = require("express");
const http = require("http");

const app = express();
const router = express.Router();
const server = http.createServer(app);

const port = 3000;

router.use((req:any, res:any, next:any) => {
  res.header("Access-Control-Allow-Methods", "GET,POST");
  next();
});

router.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

router.get("/health", (req: any, res: any) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };

  res.status(200).send(data);
});

router.put('/incrementcount', (req: any, res: any) => {

})

app.use('/api/v1', router);


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
