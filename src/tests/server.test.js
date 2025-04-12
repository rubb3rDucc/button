import {afterAll} from "@jest/globals";
import {app} from "../server.js";
import dotenv from "dotenv";
import request from "supertest";
import http from "http";
import pg from "pg";

dotenv.config();
const { Pool } = pg;

describe("API Endpoints", () => {
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

  it("should return 200 OK for root path", async () => {
    const response = await request(server).get("/");
    expect(response.statusCode).toBe(200);
  });

  it("should return count data", async () => {
    const response = await request(server).get("/api/v1/count");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('times_pressed');
  });

  it("healthcheck - should return 200 OK with correct data structure", async () => {
    const response = await request(server).get("/api/v1/health");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('date');
  });
});
