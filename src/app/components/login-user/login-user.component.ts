import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-login-user.component',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent implements OnInit {
  form!: FormGroup;
  idUser!: any | null;
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {

    console.log("Iam in constructor.....")
  }

  ngOnInit(): void {

    console.log("Iam in init method.....")

    this.form = this.fb.group({
      idUser: ['', [Validators.required, Validators.minLength(1)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.idUser = this.route.snapshot.params['idUser'] ? +this.route.snapshot.params['idUser'] : null;

  }

  getUsuarios(){

    this.userService.getList().subscribe((res) => {
      this.users = res.data || [];
      this.cdr.detectChanges();
    });

  }


  loginUsuarios() {

    console.log("After Login Processsssss........")
    console.log("UserName:::: " + this.form.get('userName')!.value)

    this.userService.getList().subscribe({
      next: (data) => {

        const activeUsers = data.filter((user: User) => user.userName === this.form.get('userName')!.value && user.password === this.form.get('password')!.value);

        if (activeUsers) {

          Swal.fire({
            icon: 'success',
            title: 'User logged successfully!',
            showConfirmButton: false,
            timer: 1500
          })


          //Send it to person page
          this.router.navigate(['/persons']);

        }
        else {

          Swal.fire({
            icon: 'error',
            title: 'User not exists!',
            showConfirmButton: false,
            timer: 1500
          })

        }
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