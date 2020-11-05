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
var operators_1 = require("rxjs/operators");
var ManagementComponent = /** @class */ (function () {
    function ManagementComponent(formBuilder, _auth) {
        this.formBuilder = formBuilder;
        this._auth = _auth;
    }
    ManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._auth.getProducts().subscribe(function (res) {
            _this.productList = res;
            _this.productNames = [];
            for (var _i = 0, _a = _this.productList; _i < _a.length; _i++) {
                var product = _a[_i];
                _this.productNames.push(product.name);
            }
            console.log(_this.productNames);
        }, function (error) {
            console.log(error);
        });
        this.myForm = this.formBuilder.group({
            productId: '',
            name: '',
            costPrice: 0.00,
            price: 0.00,
            stock: 0
        });
        this.myForm.get('name').valueChanges.subscribe(function (value) {
            _this.productList.forEach(function (element) {
                if (value === element.name) {
                    _this.myForm.get('productId').setValue("" + element.productId);
                    _this.myForm.get('price').setValue("" + element.price);
                    _this.myForm.get('stock').setValue("" + element.stock);
                }
            });
        });
        this.myForm.get('costPrice').valueChanges.subscribe(function (value) {
            if (!value)
                return;
            _this.myForm.get('price').setValue('');
            var markupPercentage = (_this._auth.getMarkupValue() / 100);
            if (!markupPercentage)
                return;
            var markupPrice = markupPercentage * value;
            var sellingPrice = Number(markupPrice) + Number(value);
            _this.myForm.get('price').setValue(sellingPrice);
        });
        this.filteredOptions = this.myForm.get('name').valueChanges
            .pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this._filter(value); }));
    };
    ManagementComponent.prototype._filter = function (value) {
        if (!value || value === '')
            return this.productNames;
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
