import dotenv from "dotenv";
import express from "express";
// import morgan from "morgan";
import http from "http";
import { router } from "./controllers/routes"
import {pool} from "./db/dbConnection"

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT;

app.use(morgan("short"));
app.use("/api/v1", router);
app.use(express.static(__dirname + '/public'));

pool.connect((err: any) => {
  if (err) throw err;  
  server.listen(port);
});

async function closeServer() {
  await server.close((err)=>{
      pool.end();
  });
}

module.exports = {
  app,
  server,
  closeServer
}