import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-dashboard-home.component',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent {
  cards = [
    { title: 'Persons', icon: 'person', route: '/persons' },
    { title: 'Professors', icon: 'settings', route: '/professors' },
    { title: 'Students', icon: 'bar_chart', route: '/students' },
  ];
}
