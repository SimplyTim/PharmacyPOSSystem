"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SettingsComponent = void 0;
var core_1 = require("@angular/core");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(_auth) {
        this._auth = _auth;
    }
    SettingsComponent.prototype.ngAfterViewInit = function () {
        this.currentMarkupValue = this._auth.getMarkupValue();
        console.log(this.currentMarkupValue);
    };
    SettingsComponent.prototype.setMargin = function () {
        var _this = this;
        var markupValue = this.input.nativeElement.value;
        this._auth.updateMarkup({ "markupVal": markupValue }).subscribe(function (res) {
            _this._auth.setMarkupValue(markupValue);
        });
    };
    __decorate([
        core_1.ViewChild('markupValue')
    ], SettingsComponent.prototype, "input");
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'app-settings',
            templateUrl: './settings.component.html',
            styleUrls: ['./settings.component.css']
        })
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
