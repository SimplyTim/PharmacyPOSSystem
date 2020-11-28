import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

/**
 *Dialog for Management component to show successful product updates
 *
 * @export
 * @class CourseDialogComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  /**
   * Creates an instance of CourseDialogComponent.
   * @param {MatDialogRef<CourseDialogComponent>} dialogRef
   * @memberof CourseDialogComponent
   */
  constructor(private dialogRef: MatDialogRef<CourseDialogComponent>) { }

  /**
   *Empty ngOnInit function
   *
   * @memberof CourseDialogComponent
   */
  ngOnInit(): void {
  }

  /**
   *Closes the dialog
   *
   * @memberof CourseDialogComponent
   */
  close() {
    this.dialogRef.close();
  } 

}
