import { z } from "zod";

export const movieCreateSchema = z.object({
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z.number().positive(),
  price: z.number().int(),
});

export const movieSchema = movieCreateSchema.extend({
  id: z.number(),
});

export const updateMovieSchema = movieCreateSchema.partial();
