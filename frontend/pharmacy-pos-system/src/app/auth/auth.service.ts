import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

type productStructure = {
  "productId": string, 
  "name": string,
  "price": number,
  "stock": number
}; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  helper = new JwtHelperService();
  private _loginUrl = "https://pharmacypos.herokuapp.com/auth";
  private _currentUserUrl = "https://pharmacypos.herokuapp.com/mydetails";
  private _registerUrl = "https://pharmacypos.herokuapp.com/employee";
  private _productsURL = "https://pharmacypos.herokuapp.com/products";
  private _createProductURL = "https://pharmacypos.herokuapp.com/product";
  private _updateProductURL = "https://pharmacypos.herokuapp.com/product";
  private _rootURL = "https://pharmacypos.herokuapp.com";
  private markupValue: number; 

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

  getProducts(){
    return this.http.get<any>(this._productsURL);
  }

  

  createProduct(product: productStructure){
    return this.http.post(this._createProductURL, product,  {responseType: 'text'}); 
  }

  updateProduct(productUpdate){
    return this.http.put(`${this._rootURL}/product`, productUpdate,  {responseType: 'text'}); 
  }

  updateMarkup(markup){
    return this.http.put(`${this._rootURL}/setmarkup`, markup,  {responseType: 'text'}); 
  }

  getMarkupValue():number {
    if(!this.markupValue){
      this.http.get<{markupId: number, markupVal: number}>(`${this._rootURL}/getmarkup`).subscribe(
        (res:any) => {
          this.markupValue = res.markupVal; 
        }
      )
    }
    return this.markupValue; 
  }

  setMarkupValue(value: number){
    this.markupValue = value; 
  }

}
