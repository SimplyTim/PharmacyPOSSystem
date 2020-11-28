import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../auth/auth.service'
import { DefaultComponent } from '../../../layouts/default/default.component';

/**
 *Shared webpage header
 *
 * @export
 * @class HeaderComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /**
   *Custom Angular property that emits a custom event within the app-header selector  
   *
   * @type {EventEmitter<any>}
   * @memberof HeaderComponent
   */
  @Output() public onClick: EventEmitter<any> = new EventEmitter(); 

  /**
   * Creates an instance of HeaderComponent.
   * @param {AuthService} authService
   * @param {DefaultComponent} _default
   * @param {MatSnackBar} _snackBar
   * @memberof HeaderComponent
   */
  constructor(public authService: AuthService, private _default: DefaultComponent, private _snackBar: MatSnackBar) { }

  /**
   *Empty ngOnInit function
   *
   * @memberof HeaderComponent
   */
  ngOnInit(): void { 
  }

  /**
   *Triggers a custom onClick event to the default layout component 
   *
   * @param {*} event
   * @memberof HeaderComponent
   */
  public onButtonClick(event):void{
    this.onClick.emit()
  }

  /**
   *Used to logout the user when they click the logout button
   *
   * @memberof HeaderComponent
   */
  logout(){
    this.authService.logoutUser();

    this._snackBar.open("Logged Out Successfully", "Close", {
      duration: 2000,
      panelClass: ['blue-snackbar']
    });

    
    this._default.setSideBarOpen(false);

  }

}
