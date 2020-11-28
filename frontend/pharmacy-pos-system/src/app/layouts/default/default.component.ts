import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

/**
 *This Angular component provides the layout for all child components within the angular project
 *
 * @export
 * @class DefaultComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  /**
   *Stores the current state of the sidebar
   *
   * @type {boolean}
   * @memberof DefaultComponent
   */
  public sideBarOpen: boolean = false; 

  /**
   * Creates an instance of DefaultComponent.
   * @param {AuthService} _auth
   * @memberof DefaultComponent
   */
  constructor(private _auth: AuthService) { }

  /**
   *Opens the sidebar if a user is currently logged in and closes the sidebar if it is not
   *
   * @memberof DefaultComponent
   */
  ngOnInit(): void {
    if(this._auth.loggedIn() === true){
      this.setSideBarOpen(true);
    }else{
      this._auth.logoutUser();
    }
  }

  /**
   *Toggles the sidebar open or closed
   *
   * @param {*} event
   * @memberof DefaultComponent
   */
  public toggleSideBar(event):void{
    this.sideBarOpen = !this.sideBarOpen; 
  }

  /**
   *Used to set the status of the sidebar programmatically 
   *
   * @param {boolean} status
   * @memberof DefaultComponent
   */
  public setSideBarOpen(status: boolean){
    this.sideBarOpen = status;
  }

}
