import { bootstrapApplication } from '@angular/platform-browser';
import { Component, Injectable } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { routes } from './app/app.routes';
import { Navigation } from './app/components/navigation/navigation';
import { Footer } from './app/components/footer/footer';

import {
  provideTranslateService,
  provideTranslateLoader,
  TranslateLoader
} from '@ngx-translate/core';
import { Observable } from 'rxjs';

// Loader custom compatible Angular 20
@Injectable()
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`/assets/i18n/${lang}.json`);
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navigation, Footer],
  template: `
    <app-navigation></app-navigation>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideTranslateLoader(CustomTranslateLoader),  
    provideTranslateService({
      lang: 'fr',
      fallbackLang: 'fr'
    })
  ]
});
