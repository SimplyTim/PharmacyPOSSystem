import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  @ViewChild('myFGD', {static: true}) form: NgForm;

  showErrorMessage = false;

  employeeDataForm = new FormGroup({
    empFirstName: new FormControl(''),
    empLastName: new FormControl(''),
    age: new FormControl(''),
    empType: new FormControl(''),
    password: new FormControl('')
  })
  
  constructor(private _auth: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this._auth.registerUser(this.employeeDataForm.value).subscribe(
      (res:any) => {
        const result = res;

        this.form.resetForm();

        this._snackBar.open("Registered Employee ID "+ result.id +" Succesfully", "Close", {
          duration: 9000,
          panelClass: ['blue-snackbar']
        });
        
      },
      error => {
        console.log(error);

        this.showErrorMessage = true;
      }
    )
  }
    
}
