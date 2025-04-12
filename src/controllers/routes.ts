import express from "express";
import { Request, Response } from "express";
import { pool } from "../db/dbConnection.js";

// used for when developing locally
const allowedOrigins = ["http://localhost:3000"];
const router = express.Router();

router.use((req: Request, res: Response, next: any) => {
  const origin: string | undefined = req.headers.origin!;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

router.get("/health", (req: Request, res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };

  res.status(200).send(data);
});

router.get("/count", (req: Request, res: Response) => {
  pool.query(`SELECT * FROM button_metrics;`, (err: any, results: any) => {
    if (err) throw err;
    res.send(results.rows);
  });
});

router.post("/increment", (req: Request, res: Response) => {
  pool.query(
    `UPDATE button_metrics 
                SET times_pressed = times_pressed + 1, 
                    last_pressed = now();`,
    (err: any, results: any) => {
      if (err) throw err;
      res.send(results.rows);
    }
  );
});

router.post("/decrement", (req: Request, res: Response) => {
  pool.query(
    `UPDATE button_metrics 
     SET times_pressed = times_pressed - 1, 
                    last_pressed = now();`,
    (err: any, results: any) => {
      if (err) throw err;
      res.send(results.rows);
    }
  );
});

export { router };
