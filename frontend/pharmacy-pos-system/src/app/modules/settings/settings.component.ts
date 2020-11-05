import { Component, AfterViewInit, ViewChild} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements AfterViewInit {

  @ViewChild('markupValue') input; 
  public currentMarkupValue: number; 

  constructor(private _auth: AuthService) {}

  ngAfterViewInit(): void {
    this.currentMarkupValue = this._auth.getMarkupValue();
    console.log(this.currentMarkupValue); 
  }

  setMargin(){
    let markupValue: number = this.input.nativeElement.value as number; 
    this._auth.updateMarkup({"markupVal": markupValue}).subscribe(
      (res:any)=>{
        this._auth.setMarkupValue(markupValue); 
      }
    ) 
  }

}
