import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ManagerGuard } from './auth/manager.guard';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { InventoryComponent } from './modules/inventory/inventory.component';
import { LoginComponent } from './modules/login/login.component';
import { ManagementComponent } from './modules/management/management.component';
import { RegisterComponent } from './modules/register/register.component';
import { SettingsComponent } from './modules/settings/settings.component';

const routes: Routes = [{
  path: '', 
  component: DefaultComponent, 
  children: [
    {
      path: '',
      component: DashboardComponent,
      canActivate: [AuthGuard]
    }, 
    {
      path: 'inventory', 
      component: InventoryComponent,
      canActivate: [AuthGuard]
    }, 
    {
      path: 'login', 
      component: LoginComponent
    }, 
    {
      path: 'register', 
      component: RegisterComponent,
      canActivate: [ManagerGuard]
    },
    {
      path: 'stock-management',
      component: ManagementComponent
    },
    {
      path: 'settings', 
      component: SettingsComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
