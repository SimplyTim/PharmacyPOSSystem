import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  username = "Username"
  type = "Type"

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("empType")){
      this.type = localStorage.getItem("empType");
      this.username = localStorage.getItem("empFirstName") + localStorage.getItem("empLastName");
    }
  }

}
