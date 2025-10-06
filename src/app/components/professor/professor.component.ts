import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule  } from '@angular/forms';
import Swal from 'sweetalert2'
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Professor } from '../../models/professor.interface';
import { ProfessorService } from '../../service/professor.service';


@Component({
  selector: 'app-professor.component',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatCardModule, MatIconModule, MatFormFieldModule, CommonModule],
  templateUrl: './professor.component.html',
  styleUrl: './professor.component.css'
})
export class ProfessorComponent implements OnInit {
  professors: Professor[] = [];
  professorSingle: Professor | undefined;
  displayedColumns: string[] = ["idProfesor", "idPerson", "name", "phone", "email", "salary"];
  dataSource:any;
  totalItems: number = 0;
  pageSize: number = 10;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private professorService: ProfessorService,
             private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getProfessors();
  }

  getProfessors(){

    this.professorService.getList().subscribe((res) => {
      this.totalItems = res.data.length;
      this.professors = res.data || [];

      this.dataSource = new MatTableDataSource<Professor>(this.professors);
      this.dataSource.paginator = this.paginator;

      this.cdr.detectChanges();
    });

  }

  deleteProfessor(idProfessor: string): void {
    this.professorService.delete(idProfessor).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Professor deleted successfully!',
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