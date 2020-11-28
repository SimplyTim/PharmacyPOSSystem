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

/**
 *AuthService is used to handle XMLHTTP requests
 *
 * @export
 * @class AuthService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   *An object of the JWTHelperSrvice that helps to check the JWT token expiration status
   *
   * @memberof AuthService
   */
  helper = new JwtHelperService();

  /**
   *URL for login
   *
   * @private
   * @memberof AuthService
   */
  private _loginUrl = "https://pharmacypos.herokuapp.com/auth";

  /**
   *URL to get the details of the current logged in user
   *
   * @private
   * @memberof AuthService
   */
  private _currentUserUrl = "https://pharmacypos.herokuapp.com/mydetails";

  /**
   *URL to register a new user
   *
   * @private
   * @memberof AuthService
   */
  private _registerUrl = "https://pharmacypos.herokuapp.com/employee";

  /**
   *URL to get all the products in the system
   *
   * @private
   * @memberof AuthService
   */
  private _productsURL = "https://pharmacypos.herokuapp.com/products";

  /**
   *URL to create a product
   *
   * @private
   * @memberof AuthService
   */
  private _createProductURL = "https://pharmacypos.herokuapp.com/product";

  /**
   *URL to update a product
   *
   * @private
   * @memberof AuthService
   */
  private _updateProductURL = "https://pharmacypos.herokuapp.com/product";

  /**
   *URL to create a new transaction
   *
   * @private
   * @memberof AuthService
   */
  private _createTransactionURL = "https://pharmacypos.herokuapp.com/transaction";

  /**
   *URL to add products to a transaction
   *
   * @private
   * @memberof AuthService
   */
  private _addProductsToTransactionURL = "https://pharmacypos.herokuapp.com/addtotrans";

  /**
   *Root URL of the site
   *
   * @private
   * @memberof AuthService
   */
  private _rootURL = "https://pharmacypos.herokuapp.com";

  /**
   *URL to get all transactions
   *
   * @private
   * @memberof AuthService
   */
  private _viewTransactionURL = "https://pharmacypos.herokuapp.com/transactioninfo";

  /**
   *URL to view a transaction detail
   *
   * @private
   * @memberof AuthService
   */
  private _viewTransactionDetail = "https://pharmacypos.herokuapp.com/transaction";

  /**
   *URL to get all employees registered to the system
   *
   * @private
   * @memberof AuthService
   */
  private _viewEmployeesURL = "https://pharmacypos.herokuapp.com/employees"

  /**
   *Used to calculate the markup of items
   *
   * @private
   * @type {number}
   * @memberof AuthService
   */
  private markupValue: number; 

  /**
   * Creates an instance of AuthService.
   * @param {HttpClient} http
   * @param {Router} router
   * @param {MatSnackBar} _snackBar
   * @memberof AuthService
   */
  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) { }

  /**
   *HTTP request to login user with credentials 
   *
   * @param {*} user
   * @return {*} 
   * @memberof AuthService
   */
  loginUser(user) {
    return this.http.post(this._loginUrl, user)
  }

  /**
   *Checks if a user is currently logged in using JwtHelperService 
   *
   * @return {*} 
   * @memberof AuthService
   */
  loggedIn() {
    try{
      return !this.helper.isTokenExpired(localStorage.getItem('token'));
    } catch (Error) {
      return false;
    }
  }

  /**
   *Gets the JWT Token of the logged in user from localstorage
   *
   * @return {*} 
   * @memberof AuthService
   */
  getToken() {
    return localStorage.getItem('token')
  }

  /**
   *Logs out user from system
   *
   * @memberof AuthService
   */
  logoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('empType')
    localStorage.removeItem('empFirstName')
    localStorage.removeItem('empLastName')
    this.router.navigate(['/login'])

  }

  /**
   *HTTP request to get the current logged in user information
   *
   * @return {*} 
   * @memberof AuthService
   */
  getCurrentUser(){
    return this.http.get<any>(this._currentUserUrl);
  }

  /**
   *Gets the current user type from localstorage
   *
   * @return {*} 
   * @memberof AuthService
   */
  getUserType(){
    return localStorage.getItem('empType')
  }

  /**
   *Gets the full name of the logged in user from localstorage
   *
   * @return {*} 
   * @memberof AuthService
   */
  getUserName(){
    return localStorage.getItem('empFirstName') + " " + localStorage.getItem('empLastName')
  }

  /**
   *HTTP request to register a user
   *
   * @param {*} userdetails
   * @return {*} 
   * @memberof AuthService
   */
  registerUser(userdetails){
    return this.http.post(this._registerUrl, userdetails)
  }

  /**
   *HTTP request to get all products 
   *
   * @return {*} 
   * @memberof AuthService
   */
  getProducts(){
    return this.http.get<any>(this._productsURL);
  }

  

  /**
   *HTTP request to create a product
   *
   * @param {productStructure} product
   * @return {*} 
   * @memberof AuthService
   */
  createProduct(product: productStructure){
    return this.http.post(this._createProductURL, product,  {responseType: 'text'}); 
  }

  /**
   *HTTP request to update a product
   *
   * @param {*} productUpdate
   * @return {*} 
   * @memberof AuthService
   */
  updateProduct(productUpdate){
    return this.http.put(`${this._rootURL}/product`, productUpdate,  {responseType: 'text'}); 
  }

  /**
   *HTTP request to update the markup of the cost of an item
   *
   * @param {*} markup
   * @return {*} 
   * @memberof AuthService
   */
  updateMarkup(markup){
    return this.http.put(`${this._rootURL}/setmarkup`, markup,  {responseType: 'text'}); 
  }

  /**
   *HTTP request to get the markup value 
   *
   * @return {*}  {number}
   * @memberof AuthService
   */
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

  /**
   *Sets the global markup value on the frontend 
   *
   * @param {number} value
   * @memberof AuthService
   */
  setMarkupValue(value: number){
    this.markupValue = value; 
  }

  /**
   *HTTP request used to create a new transaction
   *
   * @return {*} 
   * @memberof AuthService
   */
  createTransaction(){
    return this.http.post(this._createTransactionURL, ''); 
  }

  /**
   *HTTP request to add products to a transaction
   *
   * @param {*} products
   * @param {*} id
   * @return {*} 
   * @memberof AuthService
   */
  addProductsToTransaction(products, id){
    return this.http.post(this._addProductsToTransactionURL + "/" + id, products, {responseType: 'text'}); 
  }

  /**
   *HTTP request to get all transactions 
   *
   * @return {*} 
   * @memberof AuthService
   */
  getTransactions(){
    return this.http.get<any>(this._viewTransactionURL);
  }

  /**
   *HTTP request to get the details of a transaction
   *
   * @param {*} id
   * @return {*} 
   * @memberof AuthService
   */
  getTransactionDetail(id){
    return this.http.get<any>(this._viewTransactionDetail + "/" + id);
  }

  /**
   *HTTP request to get all employees 
   *
   * @return {*} 
   * @memberof AuthService
   */
  getEmployees(){
    return this.http.get<any>(this._viewEmployeesURL);
  }

}
