import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth/auth.service';

export interface Element {
  id: number;
  empFirstName : string;
  empLastName : string;
  age: number;
  empType: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataSource;

  constructor(private _auth: AuthService) { }

  displayedColumns = ['id', 'empFirstName', 'empLastName', 'age', 'empType'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this._auth.getEmployees().subscribe(
      (res:any) => {
        this.dataSource = new MatTableDataSource<Element>(res);
        this.dataSource.paginator = this.paginator;
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
