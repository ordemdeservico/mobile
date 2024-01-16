import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private storage: StorageService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes(environment.API)){
      return from(this.storage.get('token')).pipe(
        switchMap((token: string | null) => {
          const clonedRequest = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
          return next.handle(clonedRequest);
        })
      );
    }
    return next.handle(request);
  }
}
