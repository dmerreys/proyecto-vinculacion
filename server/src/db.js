import pg from "pg";
import { DB_USER, DB_HOST, DB_PASSWORD, DB_PORT, DB_DATABASE_DEV, DB_DATABASE_PROD } from "./config.js";

export const pool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASE_PROD,
  port: DB_PORT,
  ssl: true,
  max: 20,
});
