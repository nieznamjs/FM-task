import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { MoviesApiService } from '../../core/services/movies-api.service';
import { Movie, SearchMoviesResponse } from '../../shared/interfaces';
import { falseString, MovieTypes, trueString } from '../../shared/constants';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public form: FormGroup;
  public errorMessage: string;
  public isLoading$: Observable<boolean>;
  public foundMovies: Movie[] = [];
  public currentYear = new Date().getFullYear();
  public totalResults = 0;
  public minYear = 1800;
  public currentPage = 1;
  public readonly movieTypes = MovieTypes;

  constructor(
    private fb: FormBuilder,
    private moviesApiService: MoviesApiService,
  ) { }

  public ngOnInit(): void {
    this.createForm();
    this.isLoading$ = this.moviesApiService.isLoading$;
  }

  public onPageChange(page: number): void {
    this.currentPage = page;
    this.search();
  }

  public search(): void {
    if (this.form.invalid) {
      return;
    }

    const { title, year, type } = this.form.getRawValue();

    this.moviesApiService.findMovies({ title, year, type, page: this.currentPage })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorMessage = err.error.Error;
          return of(err);
        }),
      )
      .subscribe((data: SearchMoviesResponse) => {
        if (data.Response === falseString) {
          this.errorMessage = data.Error;
          this.totalResults = 0;
          this.foundMovies = [];
        }

        if (data.Response === trueString) {
          this.foundMovies = data.Search;
          this.totalResults = Number(data.totalResults);
          this.errorMessage = null;
        }
      });
  }

  private createForm(): void {
    this.form = this.fb.group({
      title: [ null, Validators.required ],
      year: [ null, [Validators.min(this.minYear), Validators.max(this.currentYear) ]],
      type: [ null ],
    });
  }
}
