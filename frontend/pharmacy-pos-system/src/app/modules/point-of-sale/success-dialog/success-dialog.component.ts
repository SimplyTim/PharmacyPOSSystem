import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../point-of-sale.component';

/**
 *Success dialog for a completed transaction
 *
 * @export
 * @class SuccessDialogComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent implements OnInit {

  /**
   * Creates an instance of SuccessDialogComponent.
   * 
   * @param {MatDialogRef<SuccessDialogComponent>} dialogRef
   * @param {DialogData} data
   * @memberof SuccessDialogComponent
   */
  constructor(private dialogRef: MatDialogRef<SuccessDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    dialogRef.disableClose = true;
  }

  /**
   *Empty ngOnInit function 
   *
   * @memberof SuccessDialogComponent
   */
  ngOnInit(): void {
  }

  /**
   *Closed the dialog
   *
   * @memberof SuccessDialogComponent
   */
  close() {
    this.dialogRef.close();
  } 

}
