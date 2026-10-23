import * as z from "zod";

export const messageValidation = z.object({
  content: z.string().max(1000, { error: "Message too long." })
});