//credit to https://stackblitz.com/edit/angular-hbakxo-5jeaic?file=app%2Ftable-filtering-example.ts for search filter funtions

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth/auth.service';

export interface Element {
  name: string;
  productId: number;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  dataSource;

  globalFilter = '';
  filteredValues = {
    productId: '', name: '', price: '',
    stock: ''
  };

  constructor(private _auth: AuthService) { }

  displayedColumns = ['productId', 'name', 'price', 'stock'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this._auth.getProducts().subscribe(
      (res:any) => {
        console.log(res)
        this.dataSource = new MatTableDataSource<Element>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.customFilterPredicate();
      },
      error => {
        console.log(error)
      }
    )
  }

  applyFilter(filter) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: Element, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        globalMatch = data.name.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      let searchString = JSON.parse(filter);
      return data.name.toString().trim().indexOf(searchString.name) !== -1 &&
        data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
  }
}





  

