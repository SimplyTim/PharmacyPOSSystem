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


@NgModule({
  declarations: [
    DefaultComponent, 
    InventoryComponent, 
    ManagementComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent
    
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
    MatIconModule
  ],
  providers: [AuthGuard, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
})
export class DefaultModule { }
