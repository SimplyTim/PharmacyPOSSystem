import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service'

/**
 *Shared webpage sidebar
 *
 * @export
 * @class SidebarComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class SidebarComponent implements OnInit {
  /**
   *Username variable
   *
   * @memberof SidebarComponent
   */
  username = "Username"
  /**
   *UserType variable
   *
   * @memberof SidebarComponent
   */
  type = "Type"

  /**
   * Creates an instance of SidebarComponent.
   * @param {AuthService} authService
   * @memberof SidebarComponent
   */
  constructor(public authService: AuthService) { }

  /**
   *Sets the username and user type from localstorage when the sidebar is initialized to their respective variables 
   *
   * @memberof SidebarComponent
   */
  ngOnInit(): void {
    if(localStorage.getItem("empType")){
      this.type = localStorage.getItem("empType");
      this.username = localStorage.getItem("empFirstName") + " " + localStorage.getItem("empLastName");
    }
  }

  /**
   *Sets the username and user type 
   *
   * @param {*} username
   * @param {*} type
   * @memberof SidebarComponent
   */
  setUserDetails(username, type){
    document.getElementById("username").innerHTML = username;
    document.getElementById("type").innerHTML = type;
  }

}
