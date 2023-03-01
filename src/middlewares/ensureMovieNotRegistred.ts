import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";
import { iMovieRepo } from "../interfaces";

const ensureMovieNotRegistred = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const moviesRepo: iMovieRepo = AppDataSource.getRepository(Movie);

  const movieName = request.body.name;

  if (movieName) {
    const exists = await moviesRepo.exist({
      where: { name: movieName },
    });

    if (exists) {
      throw new AppError("Movie already exists.", 409);
    }
  }

  next();
};

export default ensureMovieNotRegistred;
