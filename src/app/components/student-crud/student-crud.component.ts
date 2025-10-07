import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { StudentService } from '../../service/student.service';
import { Person } from '../../models/person.interface';
import { PersonService } from '../../service/person.service';

@Component({
  selector: 'app-student-crud.component',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student-crud.component.html',
  styleUrl: './student-crud.component.css'
})
export class StudentCRUDComponent implements OnInit {
  form!: FormGroup;
  idStudent!: any | null;
  persons: Person[] = [];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idPerson: ['', [Validators.required, Validators.minLength(1)]],
      student: ['', [Validators.required, Validators.minLength(10)]],
    });

    //this.idStudent = this.route.snapshot.params['idStudent'] ? +this.route.snapshot.params['idStudent'] : null;

    this.route.paramMap.subscribe(params => {
      this.idStudent = params.get('idStudent') as string;
    });

    this.getPersons();
  }

  getPersons(){

    this.personService.getList().subscribe((res) => {
      this.persons = res.data || [];
      this.cdr.detectChanges();
    });

  }

  save(): void {
    if (this.form.invalid) return;

    if (this.idStudent) {

      this.studentService.update(this.idStudent,this.form.value).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Student updated successfully!',
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
    } else {

      this.studentService.create(this.form.value).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Student created successfully!',
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
    this.router.navigate(['/students']);
  }
}