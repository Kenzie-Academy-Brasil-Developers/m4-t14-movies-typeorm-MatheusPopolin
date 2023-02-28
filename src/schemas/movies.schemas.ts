import { z } from "zod";

export const movieCreateSchema = z.object({
  name: z.string().max(50),
  description: z.optional(z.string()),
  duration: z.number(),
  price: z.number(),
});
