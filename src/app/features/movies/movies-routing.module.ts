import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const routes: Routes = [
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'movies', component: MoviesComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class MoviesRoutingModule {}
