import {afterAll} from "@jest/globals";
import pg from "pg";
import {app} from "../server.js";
import dotenv from "dotenv";
import request from "supertest";
import http from "http";


dotenv.config();
const {Pool} = pg;
// dotenv.default.config();

describe("Post Endpoints", () => {
  // let server = null;
  // let client = null;
  let agent;
  let server = http.createServer(app);

  let pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  beforeAll(() => {
    server.listen(4000, (err) => {
      if (err) return err;
    });
  });

  afterAll((done) => {
    pool.end(done);
    server.close(done);
  });

  beforeEach(function (done) {
    done();
  });

  afterEach(function (done) {
    done();
  });

  it("index- should return 200 OK", async () => {
    const response = await request(server).get("/");
    expect(response.statusCode).toBe(200);
  });

  it("/increment - has a body length", async () => {
    const response = await request(server).post("/api/v1/increment");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  it("healthcheck - should return 200 OK", async () => {
    const response = await request(server).get("/api/v1/health");
    expect(response.statusCode).toBe(200);
  });

  it("healthcheck - should return 200 OK", async () => {
    const response = await request(server).get("/api/v1/health");
    expect(response.statusCode).toBe(200);
  });
});
