import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../transactions.component';
import { SuccessDialogComponent } from '../../point-of-sale/success-dialog/success-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface Element {
  productId: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.css']
})
export class TransactionDialogComponent implements OnInit {
  dataSource;

  constructor(private dialogRef: MatDialogRef<SuccessDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['productId', 'name', 'price'];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Element>(this.data.items);
    this.dataSource.paginator = this.paginator;
  }

  close() {
    this.dialogRef.close();
  } 

}
