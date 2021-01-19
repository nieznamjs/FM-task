import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { CoreRoutingModule } from './core-routing.module';
import { MoviesModule } from '../features/movies/movies.module';
import { TokenInterceptor } from './interceptors/token.interceptor';


const featureModules = [ MoviesModule ];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreRoutingModule,
    BrowserAnimationsModule,
    MoviesModule,
    ...featureModules,
  ],
  exports: [
    CoreRoutingModule,
    ...featureModules,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
})
export class CoreModule { }
