import { Movie } from '../movie.interface';
import { MoviesApiBooleanResponse } from '../../constants';

export interface SearchMoviesResponse {
  Response: MoviesApiBooleanResponse;
  Search?: Movie[];
  totalResults?: string;
  Error?: string;
}
