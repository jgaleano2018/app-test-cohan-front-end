
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule  } from '@angular/forms';
import Swal from 'sweetalert2'
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Person } from '../../models/person.interface';
import { User } from '../../models/user.interface';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-user.component',
  imports: [CommonModule, RouterModule, FormsModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatCardModule, MatIconModule, MatFormFieldModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: User[] = [];
  personSingle: User | undefined;
  displayedColumns: string[] = ["idUser", "userName", "password"];
  dataSource:any;
  totalItems: number = 0;
  pageSize: number = 10;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor(private userService: UserService,
             private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){

    this.userService.getList().subscribe((res) => {
      this.totalItems = res.data.length;
      this.users = res.data || [];

      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;

      this.cdr.detectChanges();
    });

  }

  deletePerson(id_user: string): void {
    this.userService.delete(id_user).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'User deleted successfully!',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (err) => {
        if (err.status === 429) {
          console.warn('Rate limit exceeded. Try again later.');
        }
        Swal.fire({
          icon: 'error',
          title: 'An Error Occured!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }

}