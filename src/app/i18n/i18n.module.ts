import {HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CookieModule} from 'ngx-cookie';
import {LanguageService} from './language.service';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/o/sample-senna-angular-parcours-bundle/i18n/', '.json');
}

@NgModule({
  imports: [CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
    CookieModule.forRoot()
  ],
  providers: [LanguageService, TranslateService],
  exports: [TranslateModule]
})
export class I18nModule {

  constructor(private _translateService: TranslateService,
              private _languageService: LanguageService) {

    this._translateService.addLangs(['en', 'fr']);
    const langueCourante: string = this._languageService.ObtenirLangueCourante();
    this._translateService.use(langueCourante);

  }

}
