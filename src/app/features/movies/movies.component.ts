import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { FormsService } from '../../core/services/forms.service';
import { MoviesApiService } from '../../core/services/movies-api.service';
import { Movie } from '../../shared/interfaces';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  public form: FormGroup;
  public minYear = 1800;
  public currentYear = new Date().getFullYear();
  public foundMovies: Movie[] = [];
  public totalResults = 0;
  public error: string;
  public isLoading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    private moviesApiService: MoviesApiService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.isLoading$ = this.moviesApiService.isLoading$;
  }

  private createForm(): void {
    this.form = this.fb.group({
      title: [ null, Validators.required ],
      year: [ null, [Validators.min(this.minYear), Validators.max(this.currentYear) ]],
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    const { title, year } = this.form.getRawValue();

    this.moviesApiService.findMovies(title, year)
      .subscribe(data => {
        if (data.Response === 'False') {
          this.error = data.Error;
          this.totalResults = 0;
          this.foundMovies = [];
          return;
        }

        this.foundMovies = data.Search;
        this.totalResults = Number(data.totalResults);
        this.error = null;
      });
  }
}
