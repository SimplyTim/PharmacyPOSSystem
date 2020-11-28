import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth/auth.service';

/**
 *Interface for employee information
 *
 * @export
 * @interface Element
 */
export interface Element {
  /**
   *Employee ID Number
   *
   * @type {number}
   * @memberof Element
   */
  id: number;
  /**
   *Employee First Name
   *
   * @type {string}
   * @memberof Element
   */
  empFirstName : string;
  /**
   *Employee Last Name
   *
   * @type {string}
   * @memberof Element
   */
  empLastName : string;
  /**
   *Employee Age
   *
   * @type {number}
   * @memberof Element
   */
  age: number;
  /**
   *Employee Type
   *
   * @type {string}
   * @memberof Element
   */
  empType: string;
}

/**
 *List of users registered on the system
 *
 * @export
 * @class UsersComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  /**
   *Users data for table
   *
   * @memberof UsersComponent
   */
  dataSource;

  /**
   * Creates an instance of UsersComponent.
   * @param {AuthService} _auth
   * @memberof UsersComponent
   */
  constructor(private _auth: AuthService) { }

  /**
   *Table Columns 
   *
   * @memberof UsersComponent
   */
  displayedColumns = ['id', 'empFirstName', 'empLastName', 'age', 'empType'];
  /**
   *Table paginator
   *
   * @type {MatPaginator}
   * @memberof UsersComponent
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   *Gets all employees registered to the system and adds them to the table
   *
   * @memberof UsersComponent
   */
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

  /**
   *Filter the table based on the user search input
   *
   * @param {Event} event
   * @memberof UsersComponent
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
