import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CourseDialogComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  } 

}
