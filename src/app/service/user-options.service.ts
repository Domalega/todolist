import { Injectable } from '@angular/core';
import { BdWorkService } from './bd-work.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserOptionsService {
  constructor(private bdwork: BdWorkService, private auth: AuthService) {}

  setDefaultTheme(): void {
    const defaultTheme = localStorage.getItem('theme');
    if (defaultTheme === null) localStorage.setItem('theme', 'light');
    else if (defaultTheme === 'dark') {
      let body = document.getElementById('bodyTodoLog');
      if (body) body.classList.add('dark');
    } else if (defaultTheme === 'light') {
      const body = document.getElementById('bodyTodoLog');
      if (body) body.classList.remove('dark');
    }
  }

  changeTheme(): void {
    const theme = localStorage.getItem('theme');
    if (theme == 'light') {
      const body = document.getElementById('bodyTodoMain');
      if (body) {
        body.classList.remove('light');
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    } else if (theme == 'dark') {
      const body = document.getElementById('bodyTodoMain');
      if (body) {
        body.classList.remove('dark');
        body.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
    }
  }
}
