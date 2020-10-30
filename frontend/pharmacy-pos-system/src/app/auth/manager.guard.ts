import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {

  constructor(private _auth: AuthService, private _router: Router) { }

  canActivate(): boolean {
    if(this._auth.loggedIn() && localStorage.getItem('empType') === 'Manager'){
      return true
    } else {
      this._router.navigate([''])
      return false
    }
  }
  
}
