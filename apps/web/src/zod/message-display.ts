import * as z from "zod";

export const messageDisplayValidation = z.object({
  username: z.string(),
  content: z.string().max(1000)
});