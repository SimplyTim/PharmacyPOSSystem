import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroupDirective } from '@angular/forms';

/**
 *Allows managers to register new users to the system
 *
 * @export
 * @class RegisterComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  /**
   *Used to clear the form 
   *
   * @type {NgForm}
   * @memberof RegisterComponent
   */
  @ViewChild('myFGD', {static: true}) form: NgForm;

  /**
   *Status of login error message
   *
   * @memberof RegisterComponent
   */
  showErrorMessage = false;

  /**
   *EmployeeDataForm
   *
   * @memberof RegisterComponent
   */
  employeeDataForm = new FormGroup({
    empFirstName: new FormControl(''),
    empLastName: new FormControl(''),
    age: new FormControl(''),
    empType: new FormControl(''),
    password: new FormControl('')
  })
  
  /**
   * Creates an instance of RegisterComponent.
   * @param {AuthService} _auth
   * @param {MatSnackBar} _snackBar
   * @memberof RegisterComponent
   */
  constructor(private _auth: AuthService, private _snackBar: MatSnackBar) { }

  /**
   *Empty ngOnInit function
   *
   * @memberof RegisterComponent
   */
  ngOnInit(): void {
  }

  /**
   *When the manager presses the register button a new user is registered to the system using the registerUser function from AuthService 
   *
   * @memberof RegisterComponent
   */
  onSubmit(){
    this._auth.registerUser(this.employeeDataForm.value).subscribe(
      (res:any) => {
        const result = res;

        this.form.resetForm();

        this._snackBar.open("Registered Employee ID "+ result.id +" Successfully", "Close", {
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
