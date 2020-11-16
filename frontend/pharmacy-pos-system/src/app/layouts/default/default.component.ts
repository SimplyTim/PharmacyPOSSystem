import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  public sideBarOpen: boolean = false; 

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    if(this._auth.loggedIn() === true){
      this.setSideBarOpen(true);
    }else{
      this._auth.logoutUser();
    }
  }

  public toggleSideBar(event):void{
    this.sideBarOpen = !this.sideBarOpen; 
  }

  public setSideBarOpen(status: boolean){
    this.sideBarOpen = status;
  }

}
