import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms'; 
import { AuthService } from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  public myForm: FormGroup; 
  public productList; 
  public productNames: string[]; 
  filteredOptions: Observable<string[]>;

  constructor(private formBuilder: FormBuilder, private _auth: AuthService) { }

  ngOnInit(): void {

    this._auth.getProducts().subscribe(
      (res:any) => {
        this.productList = res;
        this.productNames = []; 
        for(let product of this.productList){
          this.productNames.push(product.name); 
        } 
        console.log(this.productNames);
      },
      error => {
        console.log(error)
      }
    )

    this.myForm = this.formBuilder.group({
      productId: '', 
      name: '',
      costPrice: 0.00,
      price: 0.00,
      stock: 0
    })

    this.myForm.get('name').valueChanges.subscribe(
      (value) => {
        this.productList.forEach(element => {
          if(value === element.name){
            this.myForm.get('productId').setValue(`${element.productId}`); 
            this.myForm.get('price').setValue(`${element.price}`); 
            this.myForm.get('stock').setValue(`${element.stock}`); 
          }
        });
      }
    );

    this.myForm.get('costPrice').valueChanges.subscribe(
      (value) => {
        if(!value) return; 
        this.myForm.get('price').setValue('');  
        let markupPercentage: number = (this._auth.getMarkupValue()/100) as number; 
        if(!markupPercentage) return; 
        let markupPrice: number = markupPercentage * value; 
        let sellingPrice: number =  Number(markupPrice) + Number(value);
        this.myForm.get('price').setValue(sellingPrice); 
      }
    );

    this.filteredOptions = this.myForm.get('name').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    if (!value || value==='') return this.productNames;
    const filterValue = value.toString().toLowerCase();
    return this.productNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  createProduct():void{
    console.log(this.myForm.value); 
    this._auth.createProduct(this.myForm.value).subscribe(
      (res:any) => {
        console.log(res); 
      }, 
      (error:any) => {
        console.log(error);
      }
    )
  }

  updateProduct(){
    this._auth.updateProduct(this.myForm.value.productId, {stock: this.myForm.value.stock}).subscribe(
      (res:any) => {
        console.log(res); 
      }, 
      (error:any) => {
        console.log(error);
      }
    )
  }

  

}
