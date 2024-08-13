import envConfig from "../config/envConfig";
import { Pool } from "pg";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = envConfig;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // In production, you may want to set this to true and provide a CA certificate
  },
  // You can add additional options if needed
});

export default pool;
