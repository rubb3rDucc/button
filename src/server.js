"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// import morgan from "morgan";
const http_1 = __importDefault(require("http"));
const routes_1 = require("./controllers/routes");
const dbConnection_1 = require("./db/dbConnection");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// const port = process.env.PORT;
// app.use(morgan("short"));
app.use("/api/v1", routes_1.router);
app.use(express_1.default.static(__dirname + '/public'));
// pool.connect((err: any) => {
//   if (err) throw err;  
//   server.listen(port);
// });
function closeServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield server.close((err) => {
            dbConnection_1.pool.end();
        });
    });
}
module.exports = {
    app,
    server,
    closeServer
};
