import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {username: '', password: ''}
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this._auth.loginUser(this.loginUserData).subscribe(
      (res:any) => {
        console.log(res)
        localStorage.setItem('token', res.access_token)
        this._router.navigate([''])
      },
      err => console.log(err)
    )
  }

}
