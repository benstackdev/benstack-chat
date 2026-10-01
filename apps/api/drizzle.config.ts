import { defineConfig } from "drizzle-kit";

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } = process.env;
const connectionString = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schemas/*",
  out: "./drizzle",
  dbCredentials: {
    url: connectionString
  }
});
