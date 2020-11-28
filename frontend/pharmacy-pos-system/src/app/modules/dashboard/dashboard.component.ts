import { Component, OnInit } from '@angular/core';

/**
 *The Dashboard Component that the user first sees when they login 
 *
 * @export
 * @class DashboardComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /**
   * Creates an instance of DashboardComponent.
   * @memberof DashboardComponent
   */
  constructor() { }

  /**
   *Empty OnItnit Function
   *
   * @memberof DashboardComponent
   */
  ngOnInit(): void {
  }

}
