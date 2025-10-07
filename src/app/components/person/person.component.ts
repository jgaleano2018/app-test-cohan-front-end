import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule  } from '@angular/forms';
import Swal from 'sweetalert2'
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PersonService } from '../../service/person.service';
import { Person } from '../../models/person.interface';


@Component({
  selector: 'app-person.component',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatCardModule, MatIconModule, MatFormFieldModule, CommonModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent implements OnInit {
  persons: Person[] = [];
  personSingle: Person | undefined;
  displayedColumns: string[] = ["idPerson", "name", "phone", "email", "edit", "delete"];
  dataSource:any;
  totalItems: number = 0;
  pageSize: number = 10;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor(private personService: PersonService,
             private router: Router,
             private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(){

    this.personService.getList().subscribe((res) => { 
      this.totalItems = res.length;
      this.persons = res || [];

      this.dataSource = new MatTableDataSource<Person>(this.persons);
      this.dataSource.paginator = this.paginator;

      this.cdr.detectChanges();
    });

  }

  editPerson(id_person: string): void {
    console.log("IDPERSON2:: " + id_person)
    this.router.navigate(['/persons/edit', id_person]);
  }

  deletePerson(id_person: string): void {
    this.personService.delete(id_person).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Person deleted successfully!',
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