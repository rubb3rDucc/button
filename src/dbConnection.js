"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require("pg");
require("dotenv").config();
const client = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});
client.connect((err) => {
    if (err)
        throw err;
    console.log("Connected to Database.");
});
exports.default = client;
