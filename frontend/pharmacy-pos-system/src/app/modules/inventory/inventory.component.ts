import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth/auth.service';

/**
 *Item Details
 *
 * @export
 * @interface Element
 */
export interface Element {
  /**
   *Item Name
   *
   * @type {string}
   * @memberof Element
   */
  name: string;
  /**
   *Product ID
   *
   * @type {number}
   * @memberof Element
   */
  productId: number;
  /**
   *Product Price
   *
   * @type {number}
   * @memberof Element
   */
  price: number;
  /**
   *Product Sock
   *
   * @type {number}
   * @memberof Element
   */
  stock: number;
}

/**
 *Inventory Component to view the current inventory
 *
 * @export
 * @class InventoryComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  /**
   *Table data
   *
   * @memberof InventoryComponent
   */
  dataSource;

  /**
   *Used to autofocus on the search input field 
   *
   * @type {ElementRef}
   * @memberof InventoryComponent
   */
  @ViewChild('focus') input: ElementRef;

  /**
   * Creates an instance of InventoryComponent.
   * @param {AuthService} _auth
   * @memberof InventoryComponent
   */
  constructor(private _auth: AuthService) { }

  /**
   *Table Columns
   *
   * @memberof InventoryComponent
   */
  displayedColumns = ['productId', 'name', 'price', 'stock'];

  /**
   *Table Paginator
   *
   * @type {MatPaginator}
   * @memberof InventoryComponent
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   *Gets the inventory from the HTTP request in the auth service and adds it to the table
   *
   * @memberof InventoryComponent
   */
  ngOnInit(): void {
    this._auth.getProducts().subscribe(
      (res:any) => {
        console.log(res)
        this.dataSource = new MatTableDataSource<Element>(res);
        this.dataSource.paginator = this.paginator;

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
   *Filters the table based on the input from the user
   *
   * @param {Event} event
   * @memberof InventoryComponent
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}





  

