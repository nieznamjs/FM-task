import { Movie } from '../movie.interface';
import { MoviesApiBooleanResponse } from '../../constants';

export interface GetMovieResponse extends Movie {
  Response: MoviesApiBooleanResponse;
}
