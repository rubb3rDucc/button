"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const dbConnection_1 = require("../db/dbConnection");
Object.defineProperty(exports, "pool", { enumerable: true, get: function () { return dbConnection_1.pool; } });
const allowedOrigins = ["http://localhost:3000"];
const router = express_1.default.Router();
exports.router = router;
router.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.get("/", () => { });
router.get("/health", (req, res) => {
    const data = {
        uptime: process.uptime(),
        message: "Ok",
        date: new Date(),
    };
    res.status(200).send(data);
});
router.get("/count", (req, res) => {
    dbConnection_1.pool.query(`SELECT * FROM button_metrics;`, (err, results) => {
        if (err)
            throw err;
        res.send(results.rows);
    });
});
router.post("/increment", (req, res) => {
    dbConnection_1.pool.query(`UPDATE button_metrics 
                SET times_pressed = times_pressed + 1, 
                    last_pressed = now();`, (err, results) => {
        if (err)
            throw err;
        res.send(results.rows);
        // console.log("incremented button count");
    });
});
router.post("/decrement", (req, res) => {
    dbConnection_1.pool.query(`UPDATE button_metrics 
                SET times_pressed = times_pressed - 1, 
                    last_pressed = now();`, (err, results) => {
        if (err)
            throw err;
        res.send(results.rows);
        // console.log("decremented button count");
    });
});
