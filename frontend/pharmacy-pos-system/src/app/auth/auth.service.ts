import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  helper = new JwtHelperService();
  private _loginUrl = "https://pharmacypos.herokuapp.com/auth"
  private _currentUserUrl = "https://pharmacypos.herokuapp.com/mydetails"

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(user) {
    return this.http.post(this._loginUrl, user)
  }

  loggedIn() {
    try{
      return !this.helper.isTokenExpired(localStorage.getItem('token'));
    } catch (Error) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('empType')
    this.router.navigate(['/login'])
  }

  getCurrentUser(){
    return this.http.get<any>(this._currentUserUrl);
  }

}