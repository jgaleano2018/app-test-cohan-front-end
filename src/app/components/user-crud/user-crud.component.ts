
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Rol } from '../../models/rol.interface';
import { UserService } from '../../service/user.service';
import { RolService } from '../../service/rol.service';
import { UserRolService } from '../../service/userRol.service';
import { User } from '../../models/user.interface';
import { UserRol } from '../../models/userRol.interface';


@Component({
  selector: 'app-user-crud.component',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCRUDComponent implements OnInit {
  form!: FormGroup;
  idUser!: any | null;
  roles: Rol[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private rolService: RolService,
    private userRolService: UserRolService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idUser: ['', [Validators.required, Validators.minLength(1)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      Password: ['', [Validators.required, Validators.minLength(3)]],
      idRol: ['', [Validators.required, Validators.minLength(1)]]
    });

    this.idUser = this.route.snapshot.params['idUser'] ? +this.route.snapshot.params['idUser'] : null;

    this.getRoles()
  }

  getRoles(){

    this.rolService.getList().subscribe((res) => {
      this.roles = res.data || [];
      this.cdr.detectChanges();
    });

  }

  save(): void {
    if (this.form.invalid) return;

    const userModel:User = {
      idUser:"0",
      userName: this.form.get('userName')!.value,
      password: this.form.get('password')!.value
    }

    if (this.idUser) {

      this.userService.update(this.idUser,this.form.value).subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'User updated successfully!',
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

      this.userService.create(this.form.value).subscribe({
        next: (data) => {

          const userRolModel:UserRol = {
            idUserRol:"0",
            idUser: data.idUser,
            idRol: this.form.get('idRol')!.value
          }

          this.userRolService.create(userRolModel).subscribe({
            next: (data) => {
              
              Swal.fire({
                icon: 'success',
                title: 'User created successfully!',
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
    this.router.navigate(['/users']);
  }
}