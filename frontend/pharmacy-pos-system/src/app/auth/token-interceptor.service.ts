import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public auth: AuthService) { }

  intercept(req, next){

    let tokenizedReq = req.clone({
      setHeaders: {
        Authrization: `Bearer ${this.auth.getToken()}`
      }
    })
    
    return next.handle(tokenizedReq)
  }
}
