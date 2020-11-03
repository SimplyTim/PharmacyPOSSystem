import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { DefaultComponent } from '../../layouts/default/default.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showErrorMessage = false;

  loginUserData = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private _auth: AuthService, private _router: Router, private _snackBar: MatSnackBar, private _default: DefaultComponent, private _sidebar: SidebarComponent) { 
    this._auth.logoutUser() //makes sure the user is logged out if they navigate to the login page
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this._auth.loginUser(this.loginUserData.value).subscribe(
      (res:any) => {
        localStorage.setItem('token', res.access_token)
        this.getCurrentUser();
        
        this._router.navigate(['/'])

        this._default.setSideBarOpen(true);

        this._snackBar.open("Logged In Succesfully", "Close", {
          duration: 2000,
          panelClass: ['blue-snackbar']
        });
      },
      error => {
        this.showErrorMessage = true;
      }
    )
  }

  getCurrentUser(){
    this._auth.getCurrentUser().subscribe(
      (res:any) => {
        this._sidebar.setUserDetials(res.empFirstName + " " + res.empLastName, res.empType);
        
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
