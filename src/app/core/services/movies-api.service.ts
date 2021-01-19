import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { delay, finalize } from 'rxjs/operators';
import { SearchMoviesResponse } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {
  public isLoading$ = new BehaviorSubject<boolean>(false);

  private moviesApiUrl = environment.omdbApiUrl;

  constructor(private http: HttpClient) { }

  public findMovies(title: string, year?: number): Observable<SearchMoviesResponse> {
    this.isLoading$.next(true);

    let params = new HttpParams()
      .set('s', title);

    if (year) {
      params = params.append('y', year.toString(10));
    }

    return this.http.get(`${this.moviesApiUrl}`, { params })
      .pipe(
        // TODO remove delay
        delay(2000),
        finalize(() => this.isLoading$.next(false)),
      );
  }
}
