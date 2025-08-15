import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../config/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private auth: AuthService, private router: Router) {}

}
