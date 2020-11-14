"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DefaultModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var default_component_1 = require("./default.component");
var router_1 = require("@angular/router");
var shared_module_1 = require("src/app/shared/shared.module");
var sidenav_1 = require("@angular/material/sidenav");
var divider_1 = require("@angular/material/divider");
var inventory_component_1 = require("src/app/modules/inventory/inventory.component");
var grid_list_1 = require("@angular/material/grid-list");
var form_field_1 = require("@angular/material/form-field");
var select_1 = require("@angular/material/select");
var table_1 = require("@angular/material/table");
var management_component_1 = require("src/app/modules/management/management.component");
var forms_1 = require("@angular/forms");
var input_1 = require("@angular/material/input");
var button_1 = require("@angular/material/button");
var checkbox_1 = require("@angular/material/checkbox");
var chips_1 = require("@angular/material/chips");
var http_1 = require("@angular/common/http");
var card_1 = require("@angular/material/card");
var forms_2 = require("@angular/forms");
var snack_bar_1 = require("@angular/material/snack-bar");
var dashboard_component_1 = require("src/app/modules/dashboard/dashboard.component");
var login_component_1 = require("src/app/modules/login/login.component");
var register_component_1 = require("src/app/modules/register/register.component");
var auth_guard_1 = require("../../auth/auth.guard");
var token_interceptor_service_1 = require("../../auth/token-interceptor.service");
var paginator_1 = require("@angular/material/paginator");
var icon_1 = require("@angular/material/icon");
var autocomplete_1 = require("@angular/material/autocomplete");
var settings_component_1 = require("src/app/modules/settings/settings.component");
var dialog_1 = require("@angular/material/dialog");
var point_of_sale_component_1 = require("src/app/modules/point-of-sale/point-of-sale.component");
var DefaultModule = /** @class */ (function () {
    function DefaultModule() {
    }
    DefaultModule = __decorate([
        core_1.NgModule({
            declarations: [
                default_component_1.DefaultComponent,
                inventory_component_1.InventoryComponent,
                management_component_1.ManagementComponent,
                register_component_1.RegisterComponent,
                login_component_1.LoginComponent,
                dashboard_component_1.DashboardComponent,
                settings_component_1.SettingsComponent,
                point_of_sale_component_1.PointOfSaleComponent
            ],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                shared_module_1.SharedModule,
                sidenav_1.MatSidenavModule,
                divider_1.MatDividerModule,
                grid_list_1.MatGridListModule,
                form_field_1.MatFormFieldModule,
                select_1.MatSelectModule,
                table_1.MatTableModule,
                forms_1.ReactiveFormsModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                button_1.MatButtonModule,
                checkbox_1.MatCheckboxModule,
                chips_1.MatChipsModule,
                card_1.MatCardModule,
                form_field_1.MatFormFieldModule,
                forms_2.FormsModule,
                input_1.MatInputModule,
                button_1.MatButtonModule,
                http_1.HttpClientModule,
                snack_bar_1.MatSnackBarModule,
                grid_list_1.MatGridListModule,
                forms_1.ReactiveFormsModule,
                select_1.MatSelectModule,
                paginator_1.MatPaginatorModule,
                icon_1.MatIconModule,
                autocomplete_1.MatAutocompleteModule,
                dialog_1.MatDialogModule
            ],
            providers: [auth_guard_1.AuthGuard,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: token_interceptor_service_1.TokenInterceptorService,
                    multi: true
                }]
        })
    ], DefaultModule);
    return DefaultModule;
}());
exports.DefaultModule = DefaultModule;
