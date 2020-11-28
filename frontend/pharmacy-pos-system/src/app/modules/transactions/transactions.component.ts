import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth/auth.service';
import { TransactionDialogComponent } from './transaction-dialog/transaction-dialog.component'


/**
 *Interface to send transaction details to the dialog
 *
 * @export
 * @interface Element
 */
export interface Element {
  /**
   *Transaction ID
   *
   * @type {string}
   * @memberof Element
   */
  transactionId: string;
  /**
   *Employee ID
   *
   * @type {number}
   * @memberof Element
   */
  empId: number;
  /**
   *Date & Time
   *
   * @type {string}
   * @memberof Element
   */
  dateTime: string;
}

/**
 *Interface to send the transaction items to the dialog
 *
 * @export
 * @interface DialogData
 */
export interface DialogData {
  /**
   *Items
   *
   * @type {*}
   * @memberof DialogData
   */
  items: any;
  /**
   *Transaction ID
   *
   * @type {number}
   * @memberof DialogData
   */
  transactionId: number;
  /**
   *Employee ID
   *
   * @type {number}
   * @memberof DialogData
   */
  empId: number;
  /**
   *Date & Time
   *
   * @type {string}
   * @memberof DialogData
   */
  dateTime: string;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  /**
   *Stores transaction items for table
   *
   * @memberof TransactionsComponent
   */
  dataSource;
  
  /**
   * Creates an instance of TransactionsComponent.
   * @param {AuthService} _auth
   * @param {MatDialog} dialog
   * @memberof TransactionsComponent
   */
  constructor(private _auth: AuthService, private dialog: MatDialog) { }

  /**
   *Table columns
   *
   * @memberof TransactionsComponent
   */
  displayedColumns = ['transactionId', 'empId', 'dateTime', 'modification'];
  /**
   *Table paginator
   *
   * @type {MatPaginator}
   * @memberof TransactionsComponent
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   *Gets all transactions and adds them to the table
   *
   * @memberof TransactionsComponent
   */
  ngOnInit(): void {
    this._auth.getTransactions().subscribe(
      (res:any) => {
        this.dataSource = new MatTableDataSource<Element>(res);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   *Filters the table based on the user's search input
   *
   * @param {Event} event
   * @memberof TransactionsComponent
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   *Gets the data from the row that the user selects the View button and gets the transaction details
   *
   * @param {*} transactionId
   * @param {*} empId
   * @param {*} dateTime
   * @memberof TransactionsComponent
   */
  row(transactionId, empId, dateTime){

    this._auth.getTransactionDetail(transactionId).subscribe(
      (res:any) => {
        this.openDialog(res, transactionId, empId, dateTime);
      },
      error => {
        console.log(error)
      }
    )
  }

  
  /**
   *Opens the transaction details dialog 
   *
   * @param {*} data
   * @param {*} transactionId
   * @param {*} empID
   * @param {*} dateTime
   * @memberof TransactionsComponent
   */
  openDialog(data, transactionId, empID, dateTime): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '700px',
      data: {
        "items" : data,
        "transactionId" : transactionId,
        "empId" : empID,
        "dateTime" : dateTime
      },
      autoFocus: false
    });
  }

}
