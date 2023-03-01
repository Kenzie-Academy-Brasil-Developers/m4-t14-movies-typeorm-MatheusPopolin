import { DeepPartial, Repository } from "typeorm";
import { z } from "zod";
import { Movie } from "../entities";
import { movieCreateSchema, movieSchema } from "../schemas";


type iMovieCreate = z.infer<typeof movieCreateSchema>;
type iMovieUpdate = DeepPartial<Movie>;
type iMovieRepo = Repository<Movie>;
type iMovie = z.infer<typeof movieSchema>
interface iMoviePage {
    prevPage: string | null,
    nextPage: string | null,
    count: number,
    data: iMovie[],
}

export { iMovieCreate, iMovieUpdate, iMovieRepo, iMovie, iMoviePage};
