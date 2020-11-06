import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms'; 
import { AuthService } from '../../auth/auth.service';

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
    this.filteredOptions = this._filter(productEntry); 
  }

  initialiseList(){
    this.filteredOptions = this.productNames;  
  }

}
