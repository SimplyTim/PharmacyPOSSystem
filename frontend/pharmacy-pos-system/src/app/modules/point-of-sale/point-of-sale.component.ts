import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

export type product = {
  "id": string,
  "name": string, 
  "price": number, 
  "quantity": number
}

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.css']
})
export class PointOfSaleComponent implements OnInit {

  public itemsForm: FormGroup; 
  public activeTransaction = false;
  public productList; 
  public productNames: string[]; 
  public productItemNumbers: string[];
  totalPrice = 0;
  filteredOptions: string[];
  @ViewChild('focus') input: ElementRef;

  constructor(private formBuilder: FormBuilder, private _auth: AuthService) { }

  ngOnInit(): void {
    this.itemsForm = this.formBuilder.group({
      products: this.formBuilder.array([])
    })

  }

  get productForms(){
    return this.itemsForm.get('products') as FormArray; 
  }

  addProduct(){
    const product = this.formBuilder.group({
      id: [],
      name: [], 
      price: [], 
      quantity: []
    })
    this.productForms.push(product); 
  }

  deleteProduct(i){
    this.productForms.removeAt(i); 
    this.calculateTotalPrice();
  }

  newTransaction(){
    this.itemsForm = this.formBuilder.group({
      products: this.formBuilder.array([])
    })

    //getting items from backend to check stock count
    this._auth.getProducts().subscribe(
      (res:any) => {
        this.productList = res;
        this.productNames = []; 
        this.productItemNumbers = []; 
        for(let product of this.productList){
          this.productNames.push(product.name); 
          this.productItemNumbers.push(product.productId); 
        }
        
        this.activeTransaction = true;
        setTimeout(()=>{
          this.input.nativeElement.focus();
        },0);
      },
      error => {
        console.log(error)
      }
    )
  }

  cancelTransaction(){
    this.activeTransaction = false;
    this.input.nativeElement.value = "";

    this.itemsForm = this.formBuilder.group({
      products: this.formBuilder.array([])
    })

    this.totalPrice = 0;
  }

  clearAllProducts(){
    this.itemsForm = this.formBuilder.group({
      products: this.formBuilder.array([])
    })
    this.totalPrice = 0;
  }

  autoCompleteID(value){
    this.productList.forEach(element => {
      if(value === element.productId && element.stock > 0){
        const product = this.formBuilder.group({
          id: [element.productId],
          name: [element.name], 
          price: [element.price], 
          quantity: [1]
        })
        this.productForms.push(product);
        this.input.nativeElement.value = "";
        this.calculateTotalPrice();
      }
    });
  }

  calculatePrice(i){
    let product = this.productForms.at(i); 
    
    this.productList.forEach(element => {
      if(product.value.id === element.productId){
        const price = element.price * product.value.quantity

        this.productForms.at(i).get('price').setValue(price);

        this.calculateTotalPrice();
      }
    });
  }

  calculateTotalPrice(){
    let productsEntered = this.productForms.value as Array<Object>;
    let total = 0;

    productsEntered.forEach(element => {
      let enteredProduct = element as product; 
      total += enteredProduct.price;
    });

    this.totalPrice = total;
  }

}
