import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 *ManagerGuard is used to allow only manager accounts to access certain sections of the site
 *
 * @export
 * @class ManagerGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {

  /**
   * Creates an instance of ManagerGuard.
   * @param {AuthService} _auth
   * @param {Router} _router
   * @memberof ManagerGuard
   */
  constructor(private _auth: AuthService, private _router: Router) { }

  /**
   *canActivate checks to see if the user that is logged into the system is manage . If they are not a manage then it redirects them to the the dashboard
   *
   * @return {*}  {boolean}
   * @memberof ManagerGuard
   */
  canActivate(): boolean {
    if(this._auth.loggedIn() && localStorage.getItem('empType') === 'Manager'){
      return true
    } else {
      this._router.navigate([''])
      return false
    }
  }
  
}
