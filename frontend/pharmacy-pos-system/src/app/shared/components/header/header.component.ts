import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../auth/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public onClick: EventEmitter<any> = new EventEmitter(); 

  constructor(public authService: AuthService) { }

  ngOnInit(): void { 
  }

  public onButtonClick(event):void{
    this.onClick.emit()
  }

}
