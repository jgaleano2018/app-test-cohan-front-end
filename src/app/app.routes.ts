
import { RouterModule, Routes } from '@angular/router';
//import { LoginUserComponent } from './components/login-user/login-user.component';
/*import { UserComponent } from './components/user/user.component';
import { UserCRUDComponent } from './components/user-crud/user-crud.component';
import { PersonComponent } from './components/person/person.component';
import { PersonCRUDComponent } from './components/person-crud/person-crud.component';
import { ProfessorComponent } from './components/professor/professor.component';
import { ProfessorCRUDComponent } from './components/professor-crud/professor-crud.component';
import { StudentComponent } from './components/student/student.component';
import { StudentCRUDComponent } from './components/student-crud/student-crud.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { inject } from '@angular/core';
import { AuthService } from './service/auth.service';

import {Oauth2RedirectHandlerComponent} from "./components/auth/oauth2-redirect-handler/oauth2-redirect-handler.component";
import {LoginComponent} from "./components/user/login/login.component";
import {DashboardComponent} from "./components/user/dashboard/dashboard.component";
import {ProfileComponent} from "./components/user/profile/profile.component";
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';*/


export const routes: Routes = [
  /*{
    path: 'loginUser',
    loadComponent: () =>
      import('./components/login-user/login-user.component').then(m => m.LoginUserComponent), canActivate: [AuthGuard]
  },*/

  //{ path: '', pathMatch: 'full', redirectTo: 'login'},
  //{ path: 'login', component: LoginComponent },
  /*{ path: 'oauth2/:provider/redirect', component: Oauth2RedirectHandlerComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'profile/:authProvider', component: ProfileComponent, canActivate: [AuthGuard] }
    ]
  },*/
  { path: '', pathMatch: 'full', redirectTo: 'dashboardHome'},
  {
    path: 'dashboardHome',
    loadComponent: () =>
      import('./components/dashboard-home/dashboard-home.component').then(m => m.DashboardHomeComponent)
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./components/user/user.component').then(m => m.UserComponent)
  },
  {
    path: 'users/new',
    loadComponent: () =>
      import('./components/user-crud/user-crud.component').then(m => m.UserCRUDComponent)
  },
  {
    path: 'users/edit',
    loadComponent: () =>
      import('./components/user-crud/user-crud.component').then(m => m.UserCRUDComponent)
  },
  {
    path: 'persons',
    loadComponent: () =>
      import('./components/person/person.component').then(m => m.PersonComponent)
  },
  {
    path: 'persons/new',
    loadComponent: () =>
      import('./components/person-crud/person-crud.component').then(m => m.PersonCRUDComponent)
  },
  {
    path: 'persons/edit',
    loadComponent: () =>
      import('./components/person-crud/person-crud.component').then(m => m.PersonCRUDComponent)
  },
  {
    path: 'professors',
    loadComponent: () =>
      import('./components/professor/professor.component').then(m => m.ProfessorComponent)
  },
  {
    path: 'professors/new',
    loadComponent: () =>
      import('./components/professor-crud/professor-crud.component').then(m => m.ProfessorCRUDComponent)
  },
  {
    path: 'professors/edit',
    loadComponent: () =>
      import('./components/professor-crud/professor-crud.component').then(m => m.ProfessorCRUDComponent)
  },
  {
    path: 'students',
    loadComponent: () =>
      import('./components/student/student.component').then(m => m.StudentComponent)
  },
  {
    path: 'students/new',
    loadComponent: () =>
      import('./components/student-crud/student-crud.component').then(m => m.StudentCRUDComponent)
  },
  {
    path: 'students/edit',
    loadComponent: () =>
      import('./components/student-crud/student-crud.component').then(m => m.StudentCRUDComponent)
  }
];

/****export const routes: Routes = [
    { path: '', redirectTo: 'loginUser', pathMatch: 'full'},
    { path: 'loginUser', component: LoginUserComponent }
]*****/