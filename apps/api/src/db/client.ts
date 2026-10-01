import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from "dotenv";
import path from 'path';
import { cwd } from 'process';

const envConnection = dotenv.config({ path: path.resolve(cwd(), '.env') });
if (envConnection.error) {
  console.error(envConnection.error);
}

if (!process.env.POSTGRES_URL) {
  console.error("db url undefined");
}

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } = process.env;
const connectionString = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

const queryClient = postgres(connectionString);
const db = drizzle({ client: queryClient });

export { db };
