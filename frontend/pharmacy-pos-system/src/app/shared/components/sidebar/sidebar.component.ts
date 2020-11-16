import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class SidebarComponent implements OnInit {
  username = "Username"
  type = "Type"

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem("empType")){
      this.type = localStorage.getItem("empType");
      this.username = localStorage.getItem("empFirstName") + " " + localStorage.getItem("empLastName");
    }
  }

  setUserDetials(username, type){
    document.getElementById("username").innerHTML = username;
    document.getElementById("type").innerHTML = type;
  }

}
