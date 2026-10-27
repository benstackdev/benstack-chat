import { validateInvite } from 'controllers/invite-middleware.ts';
import { db } from './db/client.ts';
import { serve, upgradeWebSocket, type WebSocketLike } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { auth } from 'lib/auth.ts';
import { WebSocketServer } from 'ws';
import type { WSContext } from 'hono/ws';

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

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

//! Testing only
app.get("/api/invite/:token", validateInvite);

const connections: WSContext<WebSocketLike>[] = [];

app.get('/ws', upgradeWebSocket((c) => {
  return {
    onOpen(_, ws) {
      connections.push(ws);
      console.log(`Connection to websocket opened`);
    },
    onMessage(message) {
      const data = message.data as string;
      console.log(data);
      connections.map((client) => client.send(data));
    },
    onClose() {
      console.log('Connection to websocket is closed.');
    }
  };
}));

const wss = new WebSocketServer({ noServer: true });
serve({
  fetch: app.fetch,
  port: 8080,
  websocket: { server: wss }
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
