import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class TranslationService {

   constructor(private translate: TranslateService) {
    translate.addLangs(['fr', 'en', 'es']);
    translate.setDefaultLang('en');

    // détecter la langue du navigateur
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/fr|en|es/) ? browserLang : 'fr');
  }
 changerLangue(langue: string) {
    this.translate.use(langue);
  }

  get currentLang() {
    return this.translate.currentLang;
  }


  get translateService(): TranslateService {
    return this.translate;
  }
}
