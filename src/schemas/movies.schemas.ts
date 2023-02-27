import { z } from "zod";

export const createMovieSchema = z.object({
  name: z.string().max(50),
  description: z.optional(z.string()),
  duration: z.number(),
  price: z.number(),
});

export const movieSchema = createMovieSchema.extend({
  description: z.string(),
});

export const updateMovieSchema = z.object({
  name: z.optional(z.string().max(50)),
  description: z.optional(z.string()),
  duration: z.optional(z.number()),
  price: z.optional(z.number()),
});
