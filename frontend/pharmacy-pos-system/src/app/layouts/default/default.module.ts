import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatDividerModule } from '@angular/material/divider';
import { InventoryComponent } from 'src/app/modules/inventory/inventory.component';


@NgModule({
  declarations: [
    DefaultComponent, 
    DashboardComponent, 
    InventoryComponent
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    SharedModule,
    MatSidenavModule,
    MatDividerModule
  ]
})
export class DefaultModule { }
