import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../auth/auth.service'
import { DefaultComponent } from '../../../layouts/default/default.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public onClick: EventEmitter<any> = new EventEmitter(); 

  constructor(public authService: AuthService, private _default: DefaultComponent) { }

  ngOnInit(): void { 
  }

  public onButtonClick(event):void{
    this.onClick.emit()
  }

  logout(){
    this.authService.logoutUser();
    this._default.setSideBarOpen(false);
  }

}
