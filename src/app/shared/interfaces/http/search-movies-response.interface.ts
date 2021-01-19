import { Movie } from '../movie.interface';

export interface SearchMoviesResponse {
  Response: 'True' | 'False';
  Search?: Movie[];
  totalResults?: string;
  Error?: string;
}
