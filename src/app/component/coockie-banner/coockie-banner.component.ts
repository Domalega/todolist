import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
})
export class CookieBannerComponent implements OnInit {
  isBannerOpen: boolean = true;

  ngOnInit() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      if (cookie.trim() == 'acceptCookie=true') this.isBannerOpen = false;
    }
  }

  closeBanner() {
    this.isBannerOpen = false;
    const today = new Date();
    today.setTime(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + today.toUTCString();
    document.cookie = `acceptCookie=true; ${expires} path=/`;
  }
}
