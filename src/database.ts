import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  DB_HOST,
  DB_NAME,
  DB_NAME_TEST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT = '5432',
  ENV,
} = process.env;

const client = new Pool({
  host: DB_HOST,
  database: ENV?.includes('TEST') ? DB_NAME_TEST : DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  port: parseInt(DB_PORT),
});

export default client;
