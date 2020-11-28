import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

/**
 *AuthGuard checks if a user is logged into the system before it allows them to access any functionality
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  /**
   * Creates an instance of AuthGuard.
   * @param {AuthService} _auth This service contains the HTTP request response methods
   * @param {Router} _router Service for navigation
   * @memberof AuthGuard
   */
  constructor(private _auth: AuthService, private _router: Router) { }


  /**
   *canActivate checks to see if a user is logged into the system. If they are not then it logs them out
   *
   * @return {boolean}
   * @memberof AuthGuard
   */
  canActivate(): boolean {
    if(this._auth.loggedIn()){
      return true
    } else {
      this._router.navigate(['/login'])
      return false
    }
  }
  
}
