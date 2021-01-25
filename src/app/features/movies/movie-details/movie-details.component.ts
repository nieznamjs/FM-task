import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { MoviesApiService } from '../../../core/services/movies-api.service';
import { Movie } from '../../../shared/interfaces';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  public isLoading$: Observable<boolean>;
  public movie$: Observable<Movie>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private moviesApiService: MoviesApiService,
  ) { }

  public ngOnInit(): void {
    this.isLoading$ = this.moviesApiService.isLoading$;
    this.listenToRouteChange();
  }

  public goBack(): void {
    this.location.back();
  }

  private listenToRouteChange(): void {
    this.route.params.subscribe(({ id }) => {
      this.movie$ = this.moviesApiService.getMovie(id);
    });
  }
}
