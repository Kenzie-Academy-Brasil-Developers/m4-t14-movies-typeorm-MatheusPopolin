import { Request, Response } from "express";
import { iMovie, iMoviePage } from "../interfaces";
import {
  createMovieService,
  deleteMovieService,
  listMoviesService,
  updateMoviesService,
} from "../services";

export const createMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const newMovie: iMovie = await createMovieService(request.body);

  return response.status(201).json(newMovie);
};

export const listMoviesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const moviePage: iMoviePage = await listMoviesService(request.query);

  return response.status(200).json(moviePage);
};

export const updateMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const updatedMovie: iMovie = await updateMoviesService(
    Number(request.params.id),
    request.body
  );

  return response.status(200).json(updatedMovie);
};

export const deleteMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  await deleteMovieService(Number(request.params.id));

  return response.status(204).send();
};
