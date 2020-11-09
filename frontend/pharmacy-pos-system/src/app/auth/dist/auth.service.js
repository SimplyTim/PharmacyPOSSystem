"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var angular_jwt_1 = require("@auth0/angular-jwt");
var AuthService = /** @class */ (function () {
    function AuthService(http, router, _snackBar) {
        this.http = http;
        this.router = router;
        this._snackBar = _snackBar;
        this.helper = new angular_jwt_1.JwtHelperService();
        this._loginUrl = "https://pharmacypos.herokuapp.com/auth";
        this._currentUserUrl = "https://pharmacypos.herokuapp.com/mydetails";
        this._registerUrl = "https://pharmacypos.herokuapp.com/employee";
        this._productsURL = "https://pharmacypos.herokuapp.com/products";
        this._createProductURL = "https://pharmacypos.herokuapp.com/product";
        this._updateProductURL = "https://pharmacypos.herokuapp.com/product";
        this._rootURL = "https://pharmacypos.herokuapp.com";
    }
    AuthService.prototype.loginUser = function (user) {
        return this.http.post(this._loginUrl, user);
    };
    AuthService.prototype.loggedIn = function () {
        try {
            return !this.helper.isTokenExpired(localStorage.getItem('token'));
        }
        catch (Error) {
            return false;
        }
    };
    AuthService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    AuthService.prototype.logoutUser = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('empType');
        localStorage.removeItem('empFirstName');
        localStorage.removeItem('empLastName');
        this.router.navigate(['/login']);
        this._snackBar.open("Logged Out Succesfully", "Close", {
            duration: 2000,
            panelClass: ['blue-snackbar']
        });
    };
    AuthService.prototype.getCurrentUser = function () {
        return this.http.get(this._currentUserUrl);
    };
    AuthService.prototype.getUserType = function () {
        return localStorage.getItem('empType');
    };
    AuthService.prototype.getUserName = function () {
        return localStorage.getItem('empFirstName') + " " + localStorage.getItem('empLastName');
    };
    AuthService.prototype.registerUser = function (userdetails) {
        return this.http.post(this._registerUrl, userdetails, { responseType: 'text' });
    };
    AuthService.prototype.getProducts = function () {
        return this.http.get(this._productsURL);
    };
    AuthService.prototype.createProduct = function (product) {
        return this.http.post(this._createProductURL, product, { responseType: 'text' });
    };
    AuthService.prototype.updateProduct = function (productUpdate) {
        return this.http.put(this._rootURL + "/product", productUpdate, { responseType: 'text' });
    };
    AuthService.prototype.updateMarkup = function (markup) {
        return this.http.put(this._rootURL + "/setmarkup", markup, { responseType: 'text' });
    };
    AuthService.prototype.getMarkupValue = function () {
        var _this = this;
        if (!this.markupValue) {
            this.http.get(this._rootURL + "/getmarkup").subscribe(function (res) {
                _this.markupValue = res.markupVal;
            });
        }
        return this.markupValue;
    };
    AuthService.prototype.setMarkupValue = function (value) {
        this.markupValue = value;
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
