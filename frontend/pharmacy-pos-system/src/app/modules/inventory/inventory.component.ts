import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('focus') input: ElementRef;

  constructor(private _auth: AuthService) { }

  displayedColumns = ['productId', 'name', 'price', 'stock'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}





  

