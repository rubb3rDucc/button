import { Query } from "./node_modules/@types/pg/index.d";
import dotenv from "dotenv";
import { client } from "./dbConnection";

const express = require("express");
const http = require("http");
const morgan = require("morgan");

dotenv.config();

const app = express();
const router = express.Router();
const server = http.createServer(app);
const allowedOrigins = ["http://localhost:3000"];

const port = process.env.PORT;

app.use(morgan("tiny"));
app.use("/api/v1", router);
app.use(express.static(__dirname + '/public'));

router.use((req: any, res: any, next: any) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
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

router.get("/count", (req: any, res: any) => {
  client.query(`SELECT * FROM button_metrics;`, (err: any, results: any) => {
    if (err) throw err;
    res.send(results.rows);
  });
});

router.post("/increment", (req: any, res: any) => {
  client.query(`UPDATE button_metrics 
                SET times_pressed = times_pressed + 1, 
                    last_pressed = now();`,
      (err:any, results:any) => {
      if (err) throw err;
      res.send(results.rows);
      console.log("incremented button count");
    });
});

router.post("/decrement", (req: any, res: any) => {
  client.query(`UPDATE button_metrics 
                SET times_pressed = times_pressed - 1, 
                    last_pressed = now();`,
      (err:any, results:any) => {
      if (err) throw err;
      res.send(results.rows);
      console.log("decremented button count");
    });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
