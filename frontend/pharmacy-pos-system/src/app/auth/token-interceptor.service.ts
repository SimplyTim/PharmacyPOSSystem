import { Injectable } from '@angular/core';
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

/**
 *TokenInterceptorService is used to add the JWT Token to all requests in the AuthService
 *
 * @export
 * @class TokenInterceptorService
 * @implements {HttpInterceptor}
 */
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  /**
   * Creates an instance of TokenInterceptorService.
   * @param {AuthService} auth
   * @memberof TokenInterceptorService
   */
  constructor(public auth: AuthService) { }

  /**
   *Adds the JWT Token to the HTTP header in all requests
   *
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @return {*}  {Observable<HttpEvent<any>>}
   * @memberof TokenInterceptorService
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `JWT ${this.auth.getToken()}`
      }
    });
    return next.handle(request);
  }

}
