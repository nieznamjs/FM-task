import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

@NgModule({
  declarations: [ MoviesComponent, MoviesListComponent, MovieDetailsComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    MoviesRoutingModule,
    ReactiveFormsModule,
  ],
})
export class MoviesModule {}
