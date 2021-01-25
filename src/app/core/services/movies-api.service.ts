import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { GetMovieResponse, SearchMoviesResponse } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {
  public isLoading$ = new BehaviorSubject<boolean>(false);

  private moviesApiUrl = environment.omdbApiUrl;

  constructor(private http: HttpClient) { }

  public findMovies(data: { page: number, title: string, year?: number, type?: string }): Observable<SearchMoviesResponse> {
    this.isLoading$.next(true);

    const params = this.getQueryParamsForSearchRequest(data);

    return this.http.get<SearchMoviesResponse>(`${this.moviesApiUrl}`, { params })
      .pipe(
        finalize(() => this.isLoading$.next(false)),
      );
  }

  public getMovie(id: string): Observable<GetMovieResponse> {
    this.isLoading$.next(true);

    const params = new HttpParams()
      .set('i', id);

    return this.http.get<GetMovieResponse>(`${this.moviesApiUrl}`, { params })
      .pipe(
        finalize(() => this.isLoading$.next(false)),
      );
  }

  private getQueryParamsForSearchRequest(data: {
    title: string,
    page: number,
    year?: number,
    type?: string,
  }): HttpParams {
    let params = new HttpParams()
      .set('s', data.title)
      .set('page', data.page.toString());

    if (data.year) {
      params = params.append('y', data.year.toString(10));
    }

    if (data.type) {
      params = params.append('type', data.type);
    }

    return params;
  }
}
