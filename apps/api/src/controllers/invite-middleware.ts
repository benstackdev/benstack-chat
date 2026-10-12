import type { Context } from "hono";
import { auth } from "lib/auth.ts";

export const validateInvite = async (c: Context) => {
  const token = c.req.param('token');
  if (!token) {
    return c.json({ success: false, message: "No token given." });
  }

  // get invite object based on token
  const invite = await auth.api.getInvite({
    query: { token }
  });

  return c.json(JSON.stringify(invite));
};