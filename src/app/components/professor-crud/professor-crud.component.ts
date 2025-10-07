import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProfessorService } from '../../service/professor.service';
import { PersonService } from '../../service/person.service';
import { Person } from '../../models/person.interface';


@Component({
  selector: 'app-professor-crud.component',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './professor-crud.component.html',
  styleUrl: './professor-crud.component.css'
})
export class ProfessorCRUDComponent implements OnInit {
  form!: FormGroup;
  idProfessor!: any | null;
  persons: Person[] = [];

  constructor(
    private fb: FormBuilder,
    private proffesorService: ProfessorService,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idPerson: ['', [Validators.required, Validators.minLength(1)]],
      salary: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.route.paramMap.subscribe(params => {
      this.idProfessor = params.get('idProfessor') as string;
    });

    this.getPersons();
  }

  getPersons(){
    this.personService.getList().subscribe((res) => {
      for (let idx=0; idx<res.length; idx++) {
        const personModel: Person = {
          idPerson: res[idx].id_Person,
          name: res[idx].name,
          phone: res[idx].phone,
          email: res[idx].email
        }
        this.persons.push(personModel);
      }
      this.cdr.detectChanges();
    });
  }

  save(): void {
    if (this.form.invalid) return;


    if (this.idProfessor) {

      this.proffesorService.update(this.idProfessor,this.form.value).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Professor updated successfully!',
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

      this.proffesorService.create(this.form.value).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Professor created successfully!',
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
    this.router.navigate(['/professors']);
  }
}