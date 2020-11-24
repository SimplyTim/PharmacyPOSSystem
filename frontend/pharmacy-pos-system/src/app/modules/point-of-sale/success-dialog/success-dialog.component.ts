import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../point-of-sale.component';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SuccessDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  } 

}
