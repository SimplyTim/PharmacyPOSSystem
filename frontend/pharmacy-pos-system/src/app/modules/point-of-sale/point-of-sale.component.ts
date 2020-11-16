import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component'

export type product = {
  "id": string,
  "name": string, 
  "price": number, 
  "quantity": number
}

export interface DialogData {
  change: number;
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
  amoutPaid = 0;
  itemQuantity = 0;
  transactionValid = false;
  filteredOptions: string[];
  @ViewChild('focus') input: ElementRef;

  @ViewChild('payment') payment: ElementRef;

  @ViewChild('name') name: ElementRef;

  constructor(private formBuilder: FormBuilder, private _auth: AuthService, private dialog: MatDialog) { }

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
    this.calculateItemQuantity();
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
        this.totalPrice = 0;
        this.itemQuantity = 0;
        this.transactionValid = false;
        this.payment.nativeElement.value = "";
        this.name.nativeElement.value = "";
        setTimeout(()=>{
          this.input.nativeElement.focus();
        },0);
      },
      error => {
        console.log(error)
      }
    )
  }

  clearTransaction(){
    this.activeTransaction = false;
    this.input.nativeElement.value = "";
    this.payment.nativeElement.value = "";
    this.name.nativeElement.value = "";

    this.itemsForm = this.formBuilder.group({
      products: this.formBuilder.array([])
    })

    this.totalPrice = 0;
    this.itemQuantity = 0;
    this.transactionValid = false;
  }

  clearAllProducts(){
    this.itemsForm = this.formBuilder.group({
      products: this.formBuilder.array([])
    })
    this.totalPrice = 0;
    this.itemQuantity = 0;
    this.transactionValid = false;
    this.payment.nativeElement.value = "";
  }

  private _filter(value: string): string[] {
    if (!value || value==='') return this.productNames;
    const filterValue = value.toString().toLowerCase();
    return this.productNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  autoComplete(value){
    let productEntry = value; 
    this.filteredOptions = this._filter(productEntry); 
  }

  initialiseList(){
    this.filteredOptions = this.productNames;  
  }

  autoCompleteID(value){
    let itemFound = false;
    this.productList.forEach(element => {
      if(value === element.productId && element.stock > 0){

        this.productForms.controls.forEach((element, index) => {
          if(element.value.id == value){
            this.productForms.at(index).get('quantity').setValue(element.value.quantity + 1);
            itemFound = true;
          }
        });

        if(itemFound == false){
          const product = this.formBuilder.group({
            id: [element.productId],
            name: [element.name], 
            price: [element.price], 
            quantity: [1]
          })

          this.productForms.push(product);
        }
        
        this.input.nativeElement.value = "";
        this.calculateTotalPrice();

        this.calculateItemQuantity();
      }
    });
  }

  autoCompleteName(value){
    let itemFound = false;
    this.productList.forEach(element => {
      if(value === element.name && element.stock > 0){

        this.productForms.controls.forEach((element, index) => {
          if(element.value.name == value){
            this.productForms.at(index).get('quantity').setValue(element.value.quantity + 1);
            itemFound = true;
          }
        });

        if(itemFound == false){
          const product = this.formBuilder.group({
            id: [element.productId],
            name: [element.name], 
            price: [element.price], 
            quantity: [1]
          })

          this.productForms.push(product);
        }
        
        this.name.nativeElement.value = "";
        this.calculateTotalPrice();

        this.calculateItemQuantity();
      }
    });
  }

  calculatePrice(i){
    let product = this.productForms.at(i); 
    
    this.productList.forEach(element => {
      if(product.value.id === element.productId){
        const price = element.price * product.value.quantity

        this.productForms.at(i).get('price').setValue(price.toFixed(2));

        this.calculateTotalPrice();
        this.calculateItemQuantity();
      }
    });
  }

  calculateTotalPrice(){
    let productsEntered = this.productForms.value as Array<Object>;
    let total = 0;

    productsEntered.forEach(element => {
      let enteredProduct = element as product; 
      total += (enteredProduct.price * enteredProduct.quantity);
    });

    this.totalPrice = Number(total.toFixed(2));
  }

  calculateItemQuantity(){
    let items = this.itemsForm.get('products').value as Array<Object>;
    let qty = 0;

    items.forEach(element => {
      let product = element as product; 

      qty += product.quantity;
    });

    this.itemQuantity = qty;
  }

  createTransaction(){
    let allProductIDs = [];
    let transID;

    let items = this.itemsForm.get('products').value as Array<Object>;

    items.forEach(element => {
      let product = element as product; 

      for(let i=0; i<product.quantity;i++){
        allProductIDs.push({"productId": product.id})
      }
     
    });

    this._auth.createTransaction().subscribe(
      (res:any) => {
        transID = res.transactionId;
        this.addProductsToTransaction(allProductIDs, transID);
      }, 
      (error:any) => {
        console.log(error);
      }
    )
  }

  addProductsToTransaction(allProductIDs, transID){
    this._auth.addProductsToTransaction(allProductIDs, transID).subscribe(
      (res:any) => {
        console.log(res);
        let change = this.amoutPaid - this.totalPrice;
        this.newTransaction();
        this.openDialog(change.toFixed(2));
      }, 
      (error:any) => {
        console.log(error);
      }
    )
  }

  amountPaid(value){
    if(value >= this.totalPrice){
      this.transactionValid = true;
      this.amoutPaid = value;
    }else{
      this.transactionValid = false;
    }
  }

  openDialog(change): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '300px',
      data: {"change": change}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.input.nativeElement.focus();
    });
  }

}
