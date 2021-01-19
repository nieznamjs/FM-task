import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { OMDB_API_KEY } from '../../../../secret';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const params = request.params.append('apikey', OMDB_API_KEY);
    const reqWithToken = request.clone({
      params,
    });

    return next.handle(reqWithToken);
  }
}
