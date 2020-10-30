import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showErrorMessage = false;
  loginUserData = {username: '', password: ''}
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this._auth.loginUser(this.loginUserData).subscribe(
      (res:any) => {
        localStorage.setItem('token', res.access_token)
        this.getCurrentUser();
        
        this._router.navigate([''])
      },
      error => {
        this.showErrorMessage = true;
      }
    )
  }

  getCurrentUser(){
    this._auth.getCurrentUser().subscribe(
      (res:any) => {
        console.log(res)
        localStorage.setItem('empType', res.empType)
      },
      error => {
        console.log(error)
      }
    )
  }

}
