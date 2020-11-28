import { Component, OnInit } from '@angular/core';

/**
 *Shared webpage footer
 *
 * @export
 * @class FooterComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  /**
   * Creates an instance of FooterComponent.
   * @memberof FooterComponent
   */
  constructor() { }

  /**
   *Empty ngOnInit function
   *
   * @memberof FooterComponent
   */
  ngOnInit(): void {
  }

}
