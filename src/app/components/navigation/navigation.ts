import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { TranslationService } from '../../services/translation-service';
import { TeamComponent } from '../team-component/team-component';
import { TranslateModule } from '@ngx-translate/core';

declare var bootstrap: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule,RouterModule,TranslateModule  ],
  templateUrl: './navigation.html',
  styleUrls:  ['./navigation.css']
})
export class Navigation implements OnInit {

  currentUser: User | null = null;
  //selectedFlag: string = '🌐'; 

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

  // par défaut, icône monde
  selectedFlag: string = 'https://avatars.mds.yandex.net/i?id=0a01075fcf6e7de0587b85627c57f32a-5218303-images-thumbs&n=13';

   changerLangue(lang: string) {
    // changer le drapeau
    switch(lang) {
      case 'fr':
        this.selectedFlag = 'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg';
        break;
      case 'en':
        this.selectedFlag = 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg';
        break;
      case 'es':
        this.selectedFlag = 'https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg';
        break;
      default:
        this.selectedFlag = 'https://avatars.mds.yandex.net/i?id=0a01075fcf6e7de0587b85627c57f32a-5218303-images-thumbs&n=13';
    }

    this.translationService.changerLangue(lang);
  }
}

