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

/**
 *Interface to send the amount of change to give the user to the dialog
 *
 * @export
 * @interface DialogData
 */
export interface DialogData {
  /**
   *The amount of change to give the user
   *
   * @type {number}
   * @memberof DialogData
   */
  change: number;
}

/**
 *PointOfSaleComponent to conduct transactions
 *
 * @export
 * @class PointOfSaleComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.css']
})
export class PointOfSaleComponent implements OnInit {
  /**
   *FormGroup for the items in the transaction
   *
   * @type {FormGroup}
   * @memberof PointOfSaleComponent
   */
  public itemsForm: FormGroup; 
  /**
   *Status on if there is a transaction active or not
   *
   * @memberof PointOfSaleComponent
   */
  public activeTransaction = false;
  /**
   *List of all products in the inventory
   *
   * @memberof PointOfSaleComponent
   */
  public productList; 
  /**
   *Product names of all products in the inventory
   *
   * @type {string[]}
   * @memberof PointOfSaleComponent
   */
  public productNames: string[]; 
  /**
   *Product item numbers of all products in the inventory
   *
   * @type {string[]}
   * @memberof PointOfSaleComponent
   */
  public productItemNumbers: string[];
  /**
   *Total price of all items in a transaction
   *
   * @memberof PointOfSaleComponent
   */
  totalPrice = 0;
  /**
   *Amount the customer has paid
   *
   * @memberof PointOfSaleComponent
   */
  amoutPaid = 0;
  /**
   *Number of items in the transaction
   *
   * @memberof PointOfSaleComponent
   */
  itemQuantity = 0;
  /**
   *Status on if the transaction is valid or not
   *
   * @memberof PointOfSaleComponent
   */
  transactionValid = false;
  /**
   *List of filtered options based on the user input
   *
   * @type {string[]}
   * @memberof PointOfSaleComponent
   */
  filteredOptions: string[];

  /**
   *Used to put focus on the id input field
   *
   * @type {ElementRef}
   * @memberof PointOfSaleComponent
   */
  @ViewChild('focus') input: ElementRef;

  /**
   *Payment input
   *
   * @type {ElementRef}
   * @memberof PointOfSaleComponent
   */
  @ViewChild('payment') payment: ElementRef;

  /**
   *Item name input
   *
   * @type {ElementRef}
   * @memberof PointOfSaleComponent
   */
  @ViewChild('name') name: ElementRef;

  /**
   * Creates an instance of PointOfSaleComponent.
   * @param {FormBuilder} formBuilder
   * @param {AuthService} _auth
   * @param {MatDialog} dialog
   * @memberof PointOfSaleComponent
   */
  constructor(private formBuilder: FormBuilder, private _auth: AuthService, private dialog: MatDialog) { }

  /**
   *Initializes the transaction list of items
   *
   * @memberof PointOfSaleComponent
   */
  ngOnInit(): void {
    this.itemsForm = this.formBuilder.group({
      products: this.formBuilder.array([])
    })

  }

  /**
   *Gets all items from the itemsForm
   *
   * @readonly
   * @memberof PointOfSaleComponent
   */
  get productForms(){
    return this.itemsForm.get('products') as FormArray; 
  }

  /**
   *Adds a blank item field to the itemsForm
   *
   * @memberof PointOfSaleComponent
   */
  addProduct(){
    const product = this.formBuilder.group({
      id: [],
      name: [], 
      price: [], 
      quantity: []
    })
    this.productForms.push(product); 
  }

  /**
   *Deletes a product from the itemsForm
   *
   * @param {*} i
   * @memberof PointOfSaleComponent
   */
  deleteProduct(i){
    this.productForms.removeAt(i); 
    this.calculateTotalPrice();
    this.calculateItemQuantity();
    this.payment.nativeElement.value = "";
    this.transactionValid = false;
  }

  /**
   *Initializes a new transaction by getting all the items from the inventory and setting the various variables to their state for a new transaction 
   *
   * @memberof PointOfSaleComponent
   */
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

  /**
   *Cancels the current transaction and sets everything back to its default state 
   *
   * @memberof PointOfSaleComponent
   */
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

  /**
   *Clears all products from the itemsForm
   *
   * @memberof PointOfSaleComponent
   */
  clearAllProducts(){
    this.itemsForm = this.formBuilder.group({
      products: this.formBuilder.array([])
    })
    this.totalPrice = 0;
    this.itemQuantity = 0;
    this.transactionValid = false;
    this.payment.nativeElement.value = "";
  }

  /**
   *Gets the user input and returns a filtered list of all the items that contain the substring
   *
   * @private
   * @param {string} value
   * @return {*}  {string[]}
   * @memberof PointOfSaleComponent
   */
  private _filter(value: string): string[] {
    if (!value || value==='') return this.productNames;
    const filterValue = value.toString().toLowerCase();
    return this.productNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  /**
   *Auto completes filtered list 
   *
   * @param {*} value
   * @memberof PointOfSaleComponent
   */
  autoComplete(value){
    let productEntry = value; 
    this.filteredOptions = this._filter(productEntry); 
  }

  /**
   *Initialize the filtered list
   *
   * @memberof PointOfSaleComponent
   */
  initialiseList(){
    this.filteredOptions = this.productNames;  
  }

  /**
   *When the user types a product id or scans a product using the barcode scanner it is automatically added to the itemsForm if it is found in the current inventory
   *
   * @param {*} value
   * @memberof PointOfSaleComponent
   */
  autoCompleteID(value){
    let itemFound = false;
    this.productList.forEach(element => {
      if(value === element.productId && element.stock > 0){

        this.productForms.controls.forEach((element, index) => {
          if(element.value.id == value){
            this.productForms.at(index).get('quantity').setValue(element.value.quantity + 1);
            this.calculatePrice(index);
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

  /**
   *When the user selects an item name from the search list it is automatically added to the itemsForm if it is found in the current inventory
   *
   * @param {*} value
   * @memberof PointOfSaleComponent
   */
  autoCompleteName(value){
    let itemFound = false;
    this.productList.forEach(element => {
      if(value === element.name && element.stock > 0){

        this.productForms.controls.forEach((element, index) => {
          if(element.value.name == value){
            this.productForms.at(index).get('quantity').setValue(element.value.quantity + 1);
            this.calculatePrice(index);
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

  /**
   *Calculates the total price of a row in the itemsForm
   *
   * @param {*} i
   * @memberof PointOfSaleComponent
   */
  calculatePrice(i){
    let product = this.productForms.at(i); 
    
    this.productList.forEach(element => {
      if(product.value.id === element.productId){
        const price = element.price * product.value.quantity

        this.productForms.at(i).get('price').setValue(price.toFixed(2));

        this.calculateTotalPrice();
        this.calculateItemQuantity();
        this.payment.nativeElement.value = "";
        this.transactionValid = false;
      }
    });
  }

  /**
   *Calculates the total price of all items in the itemsForm
   *
   * @memberof PointOfSaleComponent
   */
  calculateTotalPrice(){
    let productsEntered = this.productForms.value as Array<Object>;
    let total: number = 0.0;

    productsEntered.forEach(element => {
      let enteredProduct = element as product; 
      total += Number(enteredProduct.price);
    });

    this.totalPrice = Number(total.toFixed(2));
  }

  /**
   *Sets focus back on the ID input field when the user presses enter in the quantity field
   *
   * @param {*} keyEvent
   * @memberof PointOfSaleComponent
   */
  onEnterPress(keyEvent) {
    if (keyEvent.keyCode === 13)
      this.input.nativeElement.focus();
  }

  /**
   *Calculates the total amount of items in the itemsForm
   *
   * @memberof PointOfSaleComponent
   */
  calculateItemQuantity(){
    let items = this.itemsForm.get('products').value as Array<Object>;
    let qty = 0;

    items.forEach(element => {
      let product = element as product; 

      qty += product.quantity;
    });

    this.itemQuantity = qty;
  }

  /**
   *Creates a new transaction using the AuthService createTransaction function and adds all items from the itemsForm to it using the addProductsToTransaction function
   *
   * @memberof PointOfSaleComponent
   */
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

  /**
   *Adds an item to a transaction using the AuthService addProductsToTransaction function
   *
   * @param {*} allProductIDs
   * @param {*} transID
   * @memberof PointOfSaleComponent
   */
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

  /**
   *Checks to see if the amount paid by the user is more than or equal to the total price
   *
   * @param {*} value
   * @memberof PointOfSaleComponent
   */
  amountPaid(value){
    if(value >= this.totalPrice){
      this.transactionValid = true;
      this.amoutPaid = value;
    }else{
      this.transactionValid = false;
    }
  }

  /**
   *Opens the success dialog to show how much change the user should receive 
   *
   * @param {*} change
   * @memberof PointOfSaleComponent
   */
  openDialog(change): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '300px',
      data: {"change": change},
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.input.nativeElement.focus();
    });
  }

}
