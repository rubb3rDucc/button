import { Connector, IpAddressTypes } from "@google-cloud/cloud-sql-connector";
import { GoogleAuth } from "google-auth-library";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const keysEnvVar = process.env.CREDS!;
let testEnv = process.env.NODE_ENV;
let pool:any = null;


if (testEnv === "TEST") {
  pool = new Pool({
    host: process.env.POSTGRES_HOST as string,
    port: process.env.POSTGRES_PORT as unknown as number,
    user: process.env.POSTGRES_USER_TEST as string,
    password: process.env.POSTGRES_PASSWORD_TEST as string,
    database: process.env.POSTGRES_DB_TEST as string,
  });
}
else if (testEnv === "DEV"){
  pool = new Pool({
    host: process.env.POSTGRES_HOST as string,
    port: process.env.POSTGRES_PORT as unknown as number,
    user: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DB as string,
  });
}
else
{
  if (!keysEnvVar) {
    throw new Error('The $CREDS environment variable was not found!');
  }

  const keys = JSON.parse(keysEnvVar);
  const auth = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/sqlservice.admin"],
  });
  
  const connector = new Connector({
    auth: auth.fromJSON(keys),
  });
  
  const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.GCLOUD_STRING as string,
    ipType: IpAddressTypes.PUBLIC,
  });
  
  pool = new Pool({
    ...clientOpts,
    host: process.env.POSTGRES_HOST as string,
    port: process.env.POSTGRES_PORT as unknown as number,
    user: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DB as string,
  });
}

export { pool };
