import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";
import { iMovieRepo } from "../interfaces";

const ensureIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const moviesRepo: iMovieRepo = AppDataSource.getRepository(Movie);

  const exists = await moviesRepo.exist({ where: { id: Number(request.params.id) } });

  if (!exists) {
    throw new AppError("Movie not found", 404);
  }

  next();
};

export default ensureIdExists;
