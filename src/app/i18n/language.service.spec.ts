import { TestBed, inject } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie';
import { LanguageService } from './language.service';

let mockCookieStore = {};

describe('Service: LanguageService -> Cas avec lang dans le cookie().', () => {

  beforeEach(() => {
    mockCookieStore = { 'lang': 'fr-ca' };
    TestBed.configureTestingModule(testBedConfiguration());
  });

  it('ObtenirLangueCourante() devrait obtenir la langue du cookie (2 premiers caractères)',
    inject([LanguageService], (service: LanguageService) => {
      expect(service.ObtenirLangueCourante()).toEqual('fr');
    }));

});

describe('Service: LanguageService -> Cas sans lang dans le cookie().', () => {

  beforeEach(() => {
    mockCookieStore = {};
    TestBed.configureTestingModule(testBedConfiguration());
  });

  it('ObtenirLangueCourante() devrait obtenir fr, car l\'url ne contient pas lifeinsurance',
    inject([LanguageService], (service: LanguageService) => {
      expect(service.ObtenirLangueCourante()).toEqual('fr');
    }));

});

class MockCookieService {

  get(key: string) {
    return mockCookieStore[key] || null;
  }

  put(key: string, value: string) {
    mockCookieStore[key] = value;
  }

  remove(key: string) {
    delete mockCookieStore[key];
  }
}

function testBedConfiguration() {
  return {
    providers: [
      LanguageService,
      { provide: CookieService, useClass: MockCookieService }
    ]
  };
}
