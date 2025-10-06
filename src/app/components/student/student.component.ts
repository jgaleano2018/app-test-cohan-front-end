
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
import { StudentService } from '../../service/student.service';
import { Student } from '../../models/student.interface';


@Component({
  selector: 'app-student.component',
  imports: [CommonModule, RouterModule, FormsModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatCardModule, MatIconModule, MatFormFieldModule, CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  studentSingle: Student | undefined;
  displayedColumns: string[] = ["idStudent", "idPerson", "student", "average_mark"];
  dataSource:any;
  totalItems: number = 0;
  pageSize: number = 10;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private studentService: StudentService,
             private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(){

    this.studentService.getList().subscribe((res) => {
      this.totalItems = res.data.length;
      this.students = res.data || [];

      this.dataSource = new MatTableDataSource<Student>(this.students);
      this.dataSource.paginator = this.paginator;

      this.cdr.detectChanges();
    });

  }

  deleteStudents(idStudent: string): void {
    this.studentService.delete(idStudent).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Student deleted successfully!',
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