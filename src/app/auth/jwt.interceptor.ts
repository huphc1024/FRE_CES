import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';
import {ApplicationProperties} from '../common/application.properties';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ` + ApplicationProperties.APPLICATION_ID
        }
      });
    }
    return next.handle(request);
  }
}
