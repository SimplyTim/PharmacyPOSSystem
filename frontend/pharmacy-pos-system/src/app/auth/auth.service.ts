import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  helper = new JwtHelperService();
  private _loginUrl = "https://pharmacypos.herokuapp.com/auth"
  private _currentUserUrl = "https://pharmacypos.herokuapp.com/mydetails"
  private _registerUrl = "https://pharmacypos.herokuapp.com/employee"


  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) { }

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
    localStorage.removeItem('empFirstName')
    localStorage.removeItem('empLastName')
    this.router.navigate(['/login'])

    this._snackBar.open("Logged Out Succesfully", "Close", {
      duration: 2000,
      panelClass: ['blue-snackbar']
    });
  }

  getCurrentUser(){
    return this.http.get<any>(this._currentUserUrl);
  }

  getUserType(){
    return localStorage.getItem('empType')
  }

  getUserName(){
    return localStorage.getItem('empFirstName') + " " + localStorage.getItem('empLastName')
  }

  registerUser(userdetails){
    return this.http.post(this._registerUrl, userdetails, {responseType: 'text'})
  }

}
