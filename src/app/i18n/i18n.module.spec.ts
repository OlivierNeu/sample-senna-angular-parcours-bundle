import { TestBed, inject } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { TranslateService } from '@ngx-translate/core';
import { I18nModule } from './i18n.module';
import { MockBackend } from '@angular/http/testing';
import { XHRBackend } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

const langueTest = 'en';

describe('I18nModule: creation', () => {

  beforeEach(() => {
    TestBed.configureTestingModule(testBedConfiguration());
  });

  it('Creation devrait definir langue courante',  inject([TranslateService], (service: TranslateService) => {
    expect(service.currentLang).toBe(langueTest);
  }));

  it('Creation devrait definir langues disponible',  inject([TranslateService], (service: TranslateService) => {
    expect(service.getLangs()[0]).toBe('en');
    expect(service.getLangs()[1]).toBe('fr');
  }));

});

class MockLanguageService extends LanguageService {
  ObtenirLangueCourante() {
    return langueTest;
  }
}

function testBedConfiguration() {
  return {
    providers: [
      TranslateService,
      LanguageService,
      { provide: LanguageService, useClass: MockLanguageService },
      { provide: XHRBackend, useClass: MockBackend },
    ],
    imports: [ I18nModule, HttpClientModule ]
  };
}
