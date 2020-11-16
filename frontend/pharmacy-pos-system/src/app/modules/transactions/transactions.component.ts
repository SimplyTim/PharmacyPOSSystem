import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth/auth.service';
import { TransactionDialogComponent } from './transaction-dialog/transaction-dialog.component'


export interface Element {
  transactionId: string;
  empId: number;
  dateTime: string;
}

export interface DialogData {
  items: any;
  transactionId: number;
  empId: number;
  dateTime: string;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  dataSource;
  
  constructor(private _auth: AuthService, private dialog: MatDialog) { }

  displayedColumns = ['transactionId', 'empId', 'dateTime', 'modification'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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
