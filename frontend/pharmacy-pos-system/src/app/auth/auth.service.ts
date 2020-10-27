import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 // @ts-ignore  
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginUrl = "https://pharmacypos.herokuapp.com/auth"
  constructor(private http: HttpClient, private router: Router) { }

  loginUser(user) {
    return this.http.post(this._loginUrl, user)
  }

  loggedIn() {
    return !this.isTokenExpired(localStorage.getItem('token'));
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  //credit to https://medium.com/@amcdnl/authentication-in-angular-jwt-c1067495c5e0

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    
    return !(date.valueOf() > new Date().valueOf());
  }

}
