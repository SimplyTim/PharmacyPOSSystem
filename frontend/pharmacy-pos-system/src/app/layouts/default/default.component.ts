import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  public sideBarOpen: boolean = true; 

  constructor() { }

  ngOnInit(): void {
  }

  public toggleSideBar(event):void{
    this.sideBarOpen = !this.sideBarOpen; 
  }

}
