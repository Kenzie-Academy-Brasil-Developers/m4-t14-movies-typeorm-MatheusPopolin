import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import {
  iMovie,
  iMovieCreate,
  iMoviePage,
  iMovieRepo,
  iMovieUpdate,
} from "../interfaces";

export const createMovieService = async (
  payload: iMovieCreate
): Promise<iMovie> => {
  const moviesRepo: iMovieRepo = AppDataSource.getRepository(Movie);

  const movie: iMovie = await moviesRepo.save(payload);

  return movie;
};

export const listMoviesService = async (queries: any): Promise<iMoviePage> => {
  let page = queries.page ? Number(queries.page) : 1;
  let perPage = queries.perPage ? Number(queries.perPage) : 5;

  if (!page || page < 1) {
    page = 1;
  }

  if (!perPage || perPage < 1 || perPage > 5) {
    perPage = 5;
  }

  const sort: "price" | "duration" | "id" =
    queries.sort === "price" || queries.sort === "duration"
      ? queries.sort
      : "id";

  let order: "asc" | "desc" = "asc";

  if (sort === "price" || sort === "duration") {
    order =
      queries.sort === "asc" || queries.order === "desc"
        ? queries.order
        : order;
  }

  const moviesRepo: iMovieRepo = AppDataSource.getRepository(Movie);

  const [movies, count] = await moviesRepo.findAndCount({
    take: perPage,
    skip: perPage * (page - 1),
    order: { [sort]: order },
  });

  const lastPage =
    count % perPage === 0 ? count / perPage : Math.trunc(count / perPage + 1);

  const prevPage =
    page > 1
      ? `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`
      : null;

  console.log(lastPage);
  const nextPage =
    page < lastPage
      ? `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`
      : null;

  return {
    prevPage: prevPage,
    nextPage: nextPage,
    count: count,
    data: movies,
  };
};

export const updateMoviesService = async (
  id: number,
  payload: iMovieUpdate
): Promise<iMovie> => {
  const moviesRepo: iMovieRepo = AppDataSource.getRepository(Movie);

  const foundMovie: iMovie | null = await moviesRepo.findOneBy({ id });

  const updatedMovie: iMovie = await moviesRepo.save({
    ...foundMovie,
    ...payload,
  });

  return updatedMovie;
};

export const deleteMovieService = async (id: number): Promise<void> => {
  const moviesRepo: iMovieRepo = AppDataSource.getRepository(Movie);

  const foundMovie: iMovie | null = await moviesRepo.findOneBy({ id });

  await moviesRepo.remove(foundMovie!);
};
