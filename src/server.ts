import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import http from "http";
import { router } from "./controllers/routes.js";
import { pool } from "./db/dbConnection.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import { setupWebSocketServer } from "./controllers/websocketController.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const server = http.createServer(app);
const port = process.env.PORT;
const wss = setupWebSocketServer(server);

app.use(morgan("short"));
app.use("/api/v1", router);
app.use(cors());
app.use(express.static(__dirname + "/public"));

pool.connect((err: any) => {
  if (err) throw err;
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app, server, wss };
