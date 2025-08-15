import { Component, Inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { filter } from 'rxjs';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterOutlet, NavComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'promeet_UI';

  isLoginPage = false;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const body = this.document.body;
        body.className = ''; 
        if (e.urlAfterRedirects.startsWith('/login')) {
          body.classList.add('login-page');
          this.isLoginPage = true;
        } else if (e.urlAfterRedirects.startsWith('/dashboard')) {
          body.classList.add('dashboard-page');
          this.isLoginPage = false;
        } else {
          body.classList.add('app-page');
          this.isLoginPage = false;
        }
      });
  }
}
