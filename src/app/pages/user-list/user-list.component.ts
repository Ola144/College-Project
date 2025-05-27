import { AfterViewInit, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IAPIResponse, UserModel } from '../../Model/user';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, CommonModule, MatLabel, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements AfterViewInit {
  masterService: MasterService = inject(MasterService);
  toastr: ToastrService = inject(ToastrService);

  userList: any;

  dataSource!: MatTableDataSource<UserModel>;
  displayedColumns: string[] = ["index", "fullName", "userName", "emailId", "role", "password"];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.masterService.getAllUsers().subscribe({
      next: (res: IAPIResponse) => {
        this.userList = res.data;

        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: IAPIResponse) => {
        this.toastr.error(err.message);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }


}
