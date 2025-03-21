"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection_1 = __importDefault(require("./dbConnection"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const router = express_1.default.Router();
const server = http_1.default.createServer(app);
const allowedOrigins = ["http://localhost:3000"];
const port = process.env.PORT;
app.use((0, morgan_1.default)("short"));
app.use("/api/v1", router);
app.use(express_1.default.static(__dirname + '/public'));
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
router.get("/", () => {
});
router.get("/health", (req, res) => {
    const data = {
        uptime: process.uptime(),
        message: "Ok",
        date: new Date(),
    };
    res.status(200).send(data);
});
router.get("/count", (req, res) => {
    dbConnection_1.default.query(`SELECT * FROM button_metrics;`, (err, results) => {
        if (err)
            throw err;
        res.send(results.rows);
    });
});
router.post("/increment", (req, res) => {
    dbConnection_1.default.query(`UPDATE button_metrics 
                SET times_pressed = times_pressed + 1, 
                    last_pressed = now();`, (err, results) => {
        if (err)
            throw err;
        res.send(results.rows);
        console.log("incremented button count");
    });
});
router.post("/decrement", (req, res) => {
    dbConnection_1.default.query(`UPDATE button_metrics 
                SET times_pressed = times_pressed - 1, 
                    last_pressed = now();`, (err, results) => {
        if (err)
            throw err;
        res.send(results.rows);
        console.log("decremented button count");
    });
});
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
