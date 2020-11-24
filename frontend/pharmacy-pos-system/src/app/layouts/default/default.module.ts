import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatDividerModule } from '@angular/material/divider';
import { InventoryComponent } from 'src/app/modules/inventory/inventory.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ManagementComponent } from 'src/app/modules/management/management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { RegisterComponent } from 'src/app/modules/register/register.component';
import { AuthGuard } from '../../auth/auth.guard';
import { TokenInterceptorService } from '../../auth/token-interceptor.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SettingsComponent } from 'src/app/modules/settings/settings.component';
import { MatDialogModule } from '@angular/material/dialog'; 
import { PointOfSaleComponent } from 'src/app/modules/point-of-sale/point-of-sale.component';
import { CourseDialogComponent } from 'src/app/modules/management/course-dialog/course-dialog.component';
import { SuccessDialogComponent } from 'src/app/modules/point-of-sale/success-dialog/success-dialog.component';
import { TransactionDialogComponent } from 'src/app/modules/transactions/transaction-dialog/transaction-dialog.component';
import { TransactionsComponent } from 'src/app/modules/transactions/transactions.component';
import { UsersComponent } from 'src/app/modules/users/users.component';


@NgModule({
  declarations: [
    DefaultComponent, 
    InventoryComponent, 
    ManagementComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent, 
    SettingsComponent,
    PointOfSaleComponent,
    CourseDialogComponent,
    SuccessDialogComponent,
    TransactionsComponent,
    TransactionDialogComponent,
    UsersComponent
    
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatTableModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    MatCheckboxModule, 
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatIconModule, 
    MatAutocompleteModule, 
    MatDialogModule
  ],
  providers: [AuthGuard, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  entryComponents: [CourseDialogComponent, SuccessDialogComponent, TransactionDialogComponent], 
})
export class DefaultModule { }
