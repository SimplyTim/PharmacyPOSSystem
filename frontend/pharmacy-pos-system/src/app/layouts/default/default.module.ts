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



@NgModule({
  declarations: [
    DefaultComponent, 
    InventoryComponent
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class DefaultModule { }
