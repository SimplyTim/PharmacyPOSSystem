import { Component, AfterViewInit, ViewChild} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';



/**
 *Sets the system wide markup
 *
 * @export
 * @class SettingsComponent
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements AfterViewInit {

  /**
   *User input for markup
   *
   * @memberof SettingsComponent
   */
  @ViewChild('markupValue') input; 
  /**
   *Current system markup
   *
   * @type {number}
   * @memberof SettingsComponent
   */
  public currentMarkupValue: number; 

  /**
   * Creates an instance of SettingsComponent.
   * @param {AuthService} _auth
   * @memberof SettingsComponent
   */
  constructor(private _auth: AuthService) {}

  /**
   *Gets the current markup using the getMarkupValue from AuthService
   *
   * @memberof SettingsComponent
   */
  ngAfterViewInit(): void {
    this.currentMarkupValue = this._auth.getMarkupValue();
    console.log(this.currentMarkupValue); 
  }

  /**
   *Sets the markup using the user input and the setMarkupValue function from AuthService
   *
   * @memberof SettingsComponent
   */
  setMargin(){
    let markupValue: number = this.input.nativeElement.value as number; 
    this._auth.updateMarkup({"markupVal": markupValue}).subscribe(
      (res:any)=>{
        this._auth.setMarkupValue(markupValue); 
      }
    ) 
  }

}
