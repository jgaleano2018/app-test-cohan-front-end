import {Component, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {RouterOutlet} from "@angular/router";
import {ApiService} from "../../../service/api.service";
import {AuthService} from "../../../service/auth.service";
import {catchError, EMPTY, tap} from "rxjs";
import {response} from "express";
import {MatIconButton} from "@angular/material/button";
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../card/card.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    RouterOutlet,
    MatIconButton,
    CommonModule, CardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  cards = [
    { title: 'Persons', icon: 'person', route: '/persons' },
    { title: 'Professors', icon: 'settings', route: '/professors' },
    { title: 'Students', icon: 'bar_chart', route: '/students' },
  ];

  constructor(
    private apiService: ApiService,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.loadCurrentlyLoggedInUser();
  }

  loadCurrentlyLoggedInUser() {
    this.apiService.getCurrentUser()
      .pipe(
        tap(response => {
          this.authService.authenticated = true;
        }),
        catchError(err => {
          return EMPTY;
        })
      )
  }

}
