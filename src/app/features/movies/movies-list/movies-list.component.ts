import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../shared/interfaces';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  @Input() movies: Movie[];
  @Input() totalResults: number;

  public displayedColumns = [
    'Title',
    'Year',
  ];

  constructor() { }

  ngOnInit(): void {
    console.log(this.movies)
  }

}
