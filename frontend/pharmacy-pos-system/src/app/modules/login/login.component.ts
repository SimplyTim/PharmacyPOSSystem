import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { DefaultComponent } from '../../layouts/default/default.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

/**
 *Login component to login the user
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   *Variable to store the state of the login error message
   *
   * @memberof LoginComponent
   */
  showErrorMessage = false;

  /**
   *FormGroup to store the login user details
   *
   * @memberof LoginComponent
   */
  loginUserData = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  /**
   * Creates an instance of LoginComponent.
   * @param {AuthService} _auth
   * @param {Router} _router
   * @param {MatSnackBar} _snackBar
   * @param {DefaultComponent} _default
   * @param {SidebarComponent} _sidebar
   * @memberof LoginComponent
   */
  constructor(private _auth: AuthService, private _router: Router, private _snackBar: MatSnackBar, private _default: DefaultComponent, private _sidebar: SidebarComponent) { 
    this._auth.logoutUser() //makes sure the user is logged out if they navigate to the login page
  }

  /**
   *Empty ngOnInit function
   *
   * @memberof LoginComponent
   */
  ngOnInit(): void {
  }

  /**
   *Logs in the user when the login button is clicked, navigates to the dashboard and shows a snackbar
   *
   * @memberof LoginComponent
   */
  onSubmit(){
    this._auth.loginUser(this.loginUserData.value).subscribe(
      (res:any) => {
        localStorage.setItem('token', res.access_token)
        this.getCurrentUser();
        
        this._router.navigate(['/'])

        this._default.setSideBarOpen(true);

        this._snackBar.open("Logged In Successfully", "Close", {
          duration: 2000,
          panelClass: ['blue-snackbar']
        });
      },
      error => {
        this.showErrorMessage = true;
      }
    )
  }

  /**
   *Sets the sidebar username and user type based on the user that is logging in and stores that information in localstorage to be retrieved
   *
   * @memberof LoginComponent
   */
  getCurrentUser(){
    this._auth.getCurrentUser().subscribe(
      (res:any) => {
        this._sidebar.setUserDetails(res.empFirstName + " " + res.empLastName, res.empType);
        
        localStorage.setItem('empFirstName', res.empFirstName)
        localStorage.setItem('empLastName', res.empLastName)
        localStorage.setItem('empType', res.empType)
      },
      error => {
        console.log(error)
      }
    )
  }

}
