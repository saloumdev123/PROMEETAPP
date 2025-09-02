import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navigation.html',
  styleUrls:  ['./navigation.css']
})
export class Navigation implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(
      user => this.currentUser = user
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
scrollToContact(event: Event): void {
    event.preventDefault(); 
    this.viewportScroller.scrollToAnchor('contact'); 
  }
  scrollToAbout(event: Event): void {
    event.preventDefault(); 
    this.viewportScroller.scrollToAnchor('about'); 
  }
}
