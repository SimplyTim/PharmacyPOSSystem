import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../transactions.component';
import { SuccessDialogComponent } from '../../point-of-sale/success-dialog/success-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

/**
 *Item information interface
 *
 * @export
 * @interface Element
 */
export interface Element {
  /**
   *Product ID
   *
   * @type {number}
   * @memberof Element
   */
  productId: number;
  /**
   *Product Name
   *
   * @type {string}
   * @memberof Element
   */
  name: string;
  /**
   *Product Price
   *
   * @type {number}
   * @memberof Element
   */
  price: number;
}

/**
 *Dialog to show transaction detail
 *
 * @export
 * @class TransactionDialogComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.css']
})
export class TransactionDialogComponent implements OnInit {
  /**
   *Transaction items for table  
   *
   * @memberof TransactionDialogComponent
   */
  dataSource;

  /**
   * Creates an instance of TransactionDialogComponent.
   * @param {MatDialogRef<SuccessDialogComponent>} dialogRef
   * @param {DialogData} data
   * @memberof TransactionDialogComponent
   */
  constructor(private dialogRef: MatDialogRef<SuccessDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  /**
   *Table paginator
   *
   * @type {MatPaginator}
   * @memberof TransactionDialogComponent
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   *Table columns 
   *
   * @memberof TransactionDialogComponent
   */
  displayedColumns = ['productId', 'name', 'price'];

  /**
   *Adds the list of transaction items to the table 
   *
   * @memberof TransactionDialogComponent
   */
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Element>(this.data.items);
    this.dataSource.paginator = this.paginator;
  }

  /**
   *Closes the dialog
   *
   * @memberof TransactionDialogComponent
   */
  close() {
    this.dialogRef.close();
  } 

}
