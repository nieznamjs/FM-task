import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Movie } from '../../../shared/interfaces';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {
  @Input() public movies: Movie[];
  @Input() public totalResults: number;
  @Input() public currentPage: number;

  @Output() public pageChange = new EventEmitter<number>();

  public displayedColumns = [
    'Title',
    'Year',
  ];

  public onPageChange(event: PageEvent): void {
    this.pageChange.emit(event.pageIndex + 1);
  }
}
