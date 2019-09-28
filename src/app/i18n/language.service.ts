import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class LanguageService {

  constructor(private _cookieService: CookieService) { }

  public ObtenirLangueCourante(): string {

    const langueCookie: string = this.lireCookie();

    if (langueCookie) {
      return langueCookie.substring(0, 2);
    } else {
      this.setLangueSelonURL();
      return this.lireCookie();
    }

  }

  setLangueSelonURL(): void {
    const host: string = window.location.host;
    if (host.indexOf('lifeinsurance') !== -1) {
      this._cookieService.put('lang', 'en');
    } else {
      this._cookieService.put('lang', 'fr');
    }
  }

  private lireCookie(): string {
    const langueCookie: string = this._cookieService.get('lang');
    return langueCookie;
  }
}
