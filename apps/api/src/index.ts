import { db } from './db/client.ts';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';

const app = new Hono();

app.use('/*',
  cors({
    origin: ["http://localhost:5173", "http://localhost:8080"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true
  }));

app.get('/', async (c) => {
  const dummyQuery = await db.execute('select 1');
  if (!dummyQuery) {
    throw new HTTPException(500, { message: "db connection broken" });
  }
  return c.text(`${JSON.stringify(dummyQuery)}`);
});

serve({
  fetch: app.fetch,
  port: 8080
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
