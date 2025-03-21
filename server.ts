import dotenv from "dotenv";
import client from "./dbConnection"
import express, { Request, Response } from "express";

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

router.use((req: Request, res: Response, next: any) => {
  const origin: string | undefined = req.headers.origin!;

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

router.get("/", () => {
});

router.get("/health", (res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };

  res.status(200).send(data);
});

router.get("/count", (res: Response) => {
  client.query(`SELECT * FROM button_metrics;`, (err: any, results: any) => {
    if (err) throw err;
    res.send(results.rows);
  });
});

router.post("/increment", (res: Response) => {
  client.query(`UPDATE button_metrics 
                SET times_pressed = times_pressed + 1, 
                    last_pressed = now();`,
      (err:any, results:any) => {
      if (err) throw err;
      res.send(results.rows);
      console.log("incremented button count");
    });
});

router.post("/decrement", (res: Response) => {
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
