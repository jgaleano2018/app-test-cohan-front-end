import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../service/person.service';
import Swal from 'sweetalert2'
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddressService } from '../../service/address.service';
import { Person } from '../../models/person.interface';
import { Address } from '../../models/address.interface';

@Component({
  selector: 'app-person-crud.component',
  imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './person-crud.component.html',
  styleUrl: './person-crud.component.css'
})
export class PersonCRUDComponent implements OnInit {
  form!: FormGroup;
  formAddress!: FormGroup;
  idPerson!: any | null;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      street: ['', [Validators.required, Validators.minLength(1)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', [Validators.required, Validators.minLength(3)]],
      state: ['', [Validators.required, Validators.minLength(3)]],
      postal_code: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.idPerson = this.route.snapshot.params['idPerson'] ? +this.route.snapshot.params['idPerson'] : null;
  }

  save(): void {
    if (this.form.invalid) return;

    const personModel:Person = {
      idPerson:"0",
      name: this.form.get('name')!.value,
      phone: this.form.get('phone')!.value,
      email: this.form.get('email')!.value
    }

    const addressModel:Address = {
      idAddress:"0",
      street: this.form.get('name')!.value,
      city: this.form.get('phone')!.value,
      country: this.form.get('email')!.value,
      state: this.form.get('state')!.value,
      postal_code: this.form.get('postalCode')!.value,
    }

    if (this.idPerson) {

      this.personService.update(this.idPerson,personModel).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Person updated successfully!',
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

      this.personService.create(this.form.value).subscribe({
        next: (data) => {
          this.addressService.update(data.id_person,addressModel).subscribe({
            next: (data) => {
              Swal.fire({
                icon: 'success',
                title: 'Person created successfully!',
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
    this.router.navigate(['/persons']);
  }
}