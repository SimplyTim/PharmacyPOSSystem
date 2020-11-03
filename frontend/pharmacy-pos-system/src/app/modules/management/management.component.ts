import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; 

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  public myForm: FormGroup; 

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.myForm = this.formBuilder.group({
      productId: '', 
      name: '',
      price: 0.00,
      stock: 0
    })

    this.myForm.valueChanges.subscribe(
      (x) => console.log(x)
    );

  }

}
