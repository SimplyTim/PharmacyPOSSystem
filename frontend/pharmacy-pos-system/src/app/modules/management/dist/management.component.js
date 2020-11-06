"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ManagementComponent = void 0;
var core_1 = require("@angular/core");
var ManagementComponent = /** @class */ (function () {
    function ManagementComponent(formBuilder, _auth) {
        this.formBuilder = formBuilder;
        this._auth = _auth;
    }
    ManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myForm = this.formBuilder.group({
            products: this.formBuilder.array([])
        });
        this._auth.getProducts().subscribe(function (res) {
            _this.productList = res;
            _this.productNames = [];
            for (var _i = 0, _a = _this.productList; _i < _a.length; _i++) {
                var product = _a[_i];
                _this.productNames.push(product.name);
            }
        }, function (error) {
            console.log(error);
        });
    };
    Object.defineProperty(ManagementComponent.prototype, "productForms", {
        get: function () {
            return this.myForm.get('products');
        },
        enumerable: false,
        configurable: true
    });
    ManagementComponent.prototype.addProduct = function () {
        var product = this.formBuilder.group({
            productId: [],
            name: [],
            costPrice: [],
            price: [],
            stock: []
        });
        this.productForms.push(product);
    };
    ManagementComponent.prototype.deleteProduct = function (i) {
        this.productForms.removeAt(i);
    };
    ManagementComponent.prototype._filter = function (value) {
        if (!value || value === '')
            return this.productNames;
        console.log(value);
        var filterValue = value.toString().toLowerCase();
        return this.productNames.filter(function (option) { return option.toLowerCase().includes(filterValue); });
    };
    ManagementComponent.prototype.createProduct = function () {
        console.log(this.myForm.value);
        this._auth.createProduct(this.myForm.value).subscribe(function (res) {
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    ManagementComponent.prototype.updateProduct = function () {
        this._auth.updateProduct(this.myForm.value.productId, { stock: this.myForm.value.stock }).subscribe(function (res) {
            console.log(res);
        }, function (error) {
            console.log(error);
        });
    };
    ManagementComponent.prototype.autofill = function (i) {
        var _this = this;
        var productValues = this.productForms.at(i).value;
        this.productList.forEach(function (element) {
            if (element.name === productValues.name) {
                _this.productForms.at(i).get('productId').setValue("" + element.productId);
                _this.productForms.at(i).get('price').setValue("" + element.price);
                _this.productForms.at(i).get('stock').setValue("" + element.stock);
            }
        });
    };
    ManagementComponent.prototype.calculateSP = function (i) {
        var productValues = this.productForms.at(i).value;
        this.productForms.at(i).get('price').setValue('');
        var markupPercentage = (this._auth.getMarkupValue() / 100);
        if (!markupPercentage)
            return;
        var markupPrice = markupPercentage * productValues.costPrice;
        var sellingPrice = Number(markupPrice) + Number(productValues.costPrice);
        console.log(sellingPrice);
        this.productForms.at(i).get('price').setValue(sellingPrice);
    };
    ManagementComponent.prototype.autoComplete = function (i) {
        var productEntry = this.productForms.at(i).value.name;
        this.filteredOptions = this._filter(productEntry);
    };
    ManagementComponent.prototype.initialiseList = function () {
        this.filteredOptions = this.productNames;
    };
    ManagementComponent = __decorate([
        core_1.Component({
            selector: 'app-management',
            templateUrl: './management.component.html',
            styleUrls: ['./management.component.css']
        })
    ], ManagementComponent);
    return ManagementComponent;
}());
exports.ManagementComponent = ManagementComponent;
