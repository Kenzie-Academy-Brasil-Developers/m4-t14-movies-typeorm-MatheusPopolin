import { Router } from "express";

import {
  ensureDataIsValid,
  ensureIdExists,
  ensureMovieNotRegistred,
} from "../middlewares";

import {
  createMovieController,
  listMoviesController,
  updateMovieController,
  deleteMovieController,
} from "../controllers";

import { movieCreateSchema, updateMovieSchema } from "../schemas";

export const moviesRoutes: Router = Router();

moviesRoutes.post(
  "",
  ensureDataIsValid(movieCreateSchema),
  ensureMovieNotRegistred,
  createMovieController
);
moviesRoutes.get("", listMoviesController);
moviesRoutes.patch(
  "/:id",
  ensureIdExists,
  ensureDataIsValid(updateMovieSchema),
  ensureMovieNotRegistred,
  updateMovieController
);
moviesRoutes.delete("/:id", ensureIdExists, deleteMovieController);
