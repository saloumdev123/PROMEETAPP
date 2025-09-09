import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { TranslationService } from '../../services/translation-service';
import { TeamComponent } from '../team-component/team-component';

declare var bootstrap: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule,RouterModule, TeamComponent],
  templateUrl: './navigation.html',
  styleUrls:  ['./navigation.css']
})
export class Navigation implements OnInit {

  currentUser: User | null = null;


  constructor(
    private authService: AuthService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private translationService: TranslationService)

  {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(
      user => this.currentUser = user
    );
  }

   get t() {
  return this.translationService.translateService;
}


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
scrollToContact(event: Event): void {
    event.preventDefault(); 
    this.viewportScroller.scrollToAnchor('contact'); 
  }
  scrollToAbout(event: Event): void {
    event.preventDefault(); 
    this.viewportScroller.scrollToAnchor('about'); 
  }
toggleDropdown(event: Event) {
  event.preventDefault();
  const target = event.currentTarget as HTMLElement;
  const dropdown = new bootstrap.Dropdown(target);
  dropdown.toggle();
}

 changerLangue(event: Event) {
  const select = event.target as HTMLSelectElement;
  const langue = select.value;
  this.translationService.changerLangue(langue); 
  console.log('Langue choisie :', langue);
}



}
