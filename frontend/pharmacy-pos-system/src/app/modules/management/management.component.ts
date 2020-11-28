import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms'; 
import { AuthService } from '../../auth/auth.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CourseDialogComponent } from './course-dialog/course-dialog.component';

export type product = {
  "productId": string, 
  "name": string, 
  "costPrice": number, 
  "price": number, 
  "stock": number
}

/**
 *Management component to manage inventory
 *
 * @export
 * @class ManagementComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  /**
   *FormGroup for the products entered
   *
   * @type {FormGroup}
   * @memberof ManagementComponent
   */
  public myForm: FormGroup; 
  /**
   *List of all products in the inventory
   *
   * @memberof ManagementComponent
   */
  public productList; 
  /**
   *String array to store the names of all the products in the inventory
   *
   * @type {string[]}
   * @memberof ManagementComponent
   */
  public productNames: string[]; 
  /**
   *String array to store the item numbers of the products in the inventory
   *
   * @type {string[]}
   * @memberof ManagementComponent
   */
  public productItemNumbers: string[]; 
  /**
   *Stores the names of the products that contains the substring entered by the user
   *
   * @type {string[]}
   * @memberof ManagementComponent
   */
  filteredOptions: string[];

  /**
   * Creates an instance of ManagementComponent.
   * @param {FormBuilder} formBuilder
   * @param {AuthService} _auth
   * @param {MatDialog} dialog
   * @memberof ManagementComponent
   */
  constructor(private formBuilder: FormBuilder, private _auth: AuthService, private dialog: MatDialog) { }

  /**
   *Gets all the products and stores the various items in productNames, productItemNumbers and productList
   *
   * @memberof ManagementComponent
   */
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

  /**
   *Gets the items entered by the user in the product form 
   *
   * @readonly
   * @memberof ManagementComponent
   */
  get productForms(){
    return this.myForm.get('products') as FormArray; 
  }

  /**
   *Adds a new blank line to the product form  for the user to input the details
   *
   * @memberof ManagementComponent
   */
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

  /**
   *Deletes a product from the product from
   *
   * @param {*} i
   * @memberof ManagementComponent
   */
  deleteProduct(i){
    this.productForms.removeAt(i); 
  }


  /**
   *Gets the user input and returns a filtered list of all the items that contain the substring
   *
   * @private
   * @param {string} value
   * @return {*}  {string[]}
   * @memberof ManagementComponent
   */
  private _filter(value: string): string[] {
    if (!value || value==='') return this.productNames;
    const filterValue = value.toString().toLowerCase();
    return this.productNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  /**
   *Creates a new product using the AuthService createProduct function
   *
   * @param {*} createdProducts
   * @memberof ManagementComponent
   */
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

  /**
   *Updates a product using the AuthService updateProduct function
   *
   * @param {*} updatedProducts
   * @memberof ManagementComponent
   */
  updateProduct(updatedProducts){
    this._auth.updateProduct(updatedProducts).subscribe(
      (res:any) => {
        console.log(res); 
      }, 
      (error:any) => {
        console.log(error);
      }
    )
  }

  /**
   *Updates the stock by creating new products and updating old products
   *
   * @memberof ManagementComponent
   */
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

      this.openDialog(); 
      this.ngOnInit();

    }); 

    
    if(productsCreated.length !== 0){
      this.createProduct(productsCreated); 
    }
    if(productsUpdated.length !== 0){
      console.log(productsUpdated); 
      this.updateProduct(productsUpdated);  
    }
  }

  /**
   *Autofills fields of the product form
   *
   * @param {*} i
   * @memberof ManagementComponent
   */
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

  /**
   *Calculates sales price
   *
   * @param {*} i
   * @return {*} 
   * @memberof ManagementComponent
   */
  public calculateSP(i){
    let productValues = this.productForms.at(i).value;  
    let markupPercentage: number = (this._auth.getMarkupValue()/100) as number; 
    if(!markupPercentage) return; 
    let markupPrice: number = markupPercentage * productValues.costPrice; 
    let sellingPrice: number =  Number(markupPrice) + Number(productValues.costPrice);
    console.log(sellingPrice); 
    this.productForms.at(i).get('price').setValue(sellingPrice);
  }

  /**
   *Auto completes filtered list 
   *
   * @param {*} i
   * @memberof ManagementComponent
   */
  autoComplete(i){
    let productEntry = this.productForms.at(i).value.name; 
    console.log(productEntry); 
    this.filteredOptions = this._filter(productEntry); 
  }

  /**
   *Initialize the filtered list
   *
   * @memberof ManagementComponent
   */
  initialiseList(){
    this.filteredOptions = this.productNames;  
  }

  /**
   *Opens the success dialog
   *
   * @memberof ManagementComponent
   */
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(CourseDialogComponent, dialogConfig);
}

}
