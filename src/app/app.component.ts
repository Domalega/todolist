import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'todolist';

  ngOnInit() {
    this.checkTheme();
  }

  checkTheme() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) if (cookie.trim().startsWith('theme')) return;
    const today = new Date();
    today.setTime(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + today.toUTCString();
    document.cookie = `theme=light; ${expires}`;
  }
}
