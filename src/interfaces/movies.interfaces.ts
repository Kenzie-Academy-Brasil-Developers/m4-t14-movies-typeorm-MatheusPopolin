import { z } from "zod";
import {
  createMovieSchema,
  movieSchema,
  updateMovieSchema,
} from "../schemas/movies.schemas";

export type iMovieCreateRequest = z.infer<typeof createMovieSchema>;
export type iMovie = z.infer<typeof movieSchema>;
export type iMovieUpdateRequest = z.infer<typeof updateMovieSchema>;
