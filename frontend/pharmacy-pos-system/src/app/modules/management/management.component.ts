import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms'; 
import { element } from 'protractor';
import { AuthService } from '../../auth/auth.service';

export type product = {
  "productId": string, 
  "name": string, 
  "costPrice": number, 
  "price": number, 
  "stock": number
}

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  public myForm: FormGroup; 
  public productList; 
  public productNames: string[]; 
  public productItemNumbers: string[]; 
  filteredOptions: string[];

  constructor(private formBuilder: FormBuilder, private _auth: AuthService) { }

  ngOnInit(): void {

    this.myForm = this.formBuilder.group({
      products: this.formBuilder.array([])
    })

    this._auth.getProducts().subscribe(
      (res:any) => {
        this.productList = res;
        this.productNames = []; 
        this.productItemNumbers = []; 
        for(let product of this.productList){
          this.productNames.push(product.name); 
          this.productItemNumbers.push(product.productId); 
        } 
      },
      error => {
        console.log(error)
      }
    )
  }

  get productForms(){
    return this.myForm.get('products') as FormArray; 
  }

  addProduct(){

    const product = this.formBuilder.group({
      productId: [], 
      name: [], 
      costPrice: [], 
      price: [], 
      stock: []
    })
    this.productForms.push(product); 
  }

  deleteProduct(i){
    this.productForms.removeAt(i); 
  }


  private _filter(value: string): string[] {
    if (!value || value==='') return this.productNames;
    const filterValue = value.toString().toLowerCase();
    return this.productNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  createProduct(createdProducts):void{
    this._auth.createProduct(createdProducts).subscribe(
      (res:any) => {
        console.log(res); 
      }, 
      (error:any) => {
        console.log(error);
      }
    )
  }

  updateProduct(updatedProducts){
    this._auth.updateProduct(this.myForm.value.productId, {stock: this.myForm.value.stock}).subscribe(
      (res:any) => {
        console.log(res); 
      }, 
      (error:any) => {
        console.log(error);
      }
    )
  }

  updateStock(){
    let productsEntered = this.productForms.value as Array<Object>;
    let productsCreated = []; 
    let productsUpdated = []; 

    productsEntered.forEach(element => {
      let inProductList: boolean = false; 
      let enteredProduct = element as product; 

      for(let item of this.productList){
        if(item.productId === enteredProduct.productId){
          productsUpdated.push(enteredProduct); 
          inProductList = true; 
          break; 
        }
      }

      if(!inProductList){
        productsCreated.push(enteredProduct); 
      }

    }); 

    
    if(productsCreated.length !== 0){
      this.createProduct(productsCreated); 
    }
    if(productsUpdated.length !== 0){
      console.log(productsUpdated); 
      this.updateProduct(productsUpdated);  
    }
  }

  public autofill(i){
    let productValues = this.productForms.at(i).value; 
    this.productList.forEach(element => {
      if(element.name === productValues.name || element.productId == productValues.productId){
        this.productForms.at(i).get('productId').setValue(`${element.productId}`);
        this.productForms.at(i).get('name').setValue(`${element.name}`);
        this.productForms.at(i).get('price').setValue(`${element.price}`); 
        this.productForms.at(i).get('stock').setValue(`${element.stock}`); 
      }
    });
  }

  public calculateSP(i){
    let productValues = this.productForms.at(i).value;  
    let markupPercentage: number = (this._auth.getMarkupValue()/100) as number; 
    if(!markupPercentage) return; 
    let markupPrice: number = markupPercentage * productValues.costPrice; 
    let sellingPrice: number =  Number(markupPrice) + Number(productValues.costPrice);
    console.log(sellingPrice); 
    this.productForms.at(i).get('price').setValue(sellingPrice);
  }

  autoComplete(i){
    let productEntry = this.productForms.at(i).value.name; 
    console.log(productEntry); 
    this.filteredOptions = this._filter(productEntry); 
  }

  initialiseList(){
    this.filteredOptions = this.productNames;  
  }

}
