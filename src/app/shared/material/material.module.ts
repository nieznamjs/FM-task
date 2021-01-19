import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

const materialModules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
];

@NgModule({
  imports: [
    ...materialModules,
  ],
  exports: [
    ...materialModules,
  ],
})
export class MaterialModule { }
