import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { TranslationService } from '../../services/translation-service';
import { TranslateModule } from '@ngx-translate/core';
import { PanierService } from '../../services/panier.service';

declare var bootstrap: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule,RouterModule,TranslateModule  ],
  templateUrl: './navigation.html',
  styleUrls:  ['./navigation.css']
})
export class Navigation implements OnInit {

  panierCount: number = 0;

  currentUser: User | null = null;
  //selectedFlag: string = '🌐'; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private translationService: TranslationService,
  private panierService: PanierService  )

  {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(
      user => this.currentUser = user
    );

   this.panierService.panierCount$.subscribe(count => {
      this.panierCount = count;
    });
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
    case 'ru':
      this.selectedFlag = 'https://avatars.mds.yandex.net/i?id=22841c07c7961d5880abd776ce410e1c88ab9eb9-4433927-images-thumbs&n=13';
      break;
    case 'de':
      this.selectedFlag = 'https://avatars.mds.yandex.net/i?id=f4d73167a3de6e3c0cff8273a6b5c42abc150c5a-9050054-images-thumbs&n=13';
      break;
    case 'ja':
      this.selectedFlag = 'https://avatars.mds.yandex.net/i?id=bed51cd2537e56147c20baf0f1aed3d009b2505f-16312836-images-thumbs&n=13';
      break;
    case 'pt':
      this.selectedFlag = 'https://avatars.mds.yandex.net/i?id=7e474c498f5255e0e7ac1707065550d45449bf61-3574998-images-thumbs&n=13';
      break;
    case 'tr':
      this.selectedFlag = 'https://avatars.mds.yandex.net/i?id=28f301123f0fe0d319f0ca87497e334cd583b9fd-5231754-images-thumbs&n=13';
      break;
    case 'it':
      this.selectedFlag = 'https://avatars.mds.yandex.net/i?id=7f8201073dfa243f0c43f30b9fcb06fec1ede27c-10247222-images-thumbs&n=13';
      break;
    case 'fa':
      this.selectedFlag = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg';
      break;
    case 'nl':
      this.selectedFlag = 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg';
      break;
    case 'zh':
      this.selectedFlag = 'https://avatars.mds.yandex.net/i?id=749b4646233e98dab5f57ac578deb0e82f23432f-3986582-images-thumbs&n=13';
      break;
    case 'ar':
      this.selectedFlag = 'https://avatars.mds.yandex.net/i?id=f58589df4e5590a0558a6b4889105b73eab904f0-5241497-images-thumbs&n=13';
      break;
    default:
      this.selectedFlag = 'https://avatars.mds.yandex.net/i?id=0a01075fcf6e7de0587b85627c57f32a-5218303-images-thumbs&n=13';
  }

  this.translationService.changerLangue(lang);
}

}

