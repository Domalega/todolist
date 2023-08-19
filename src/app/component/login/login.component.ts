import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  theme: string;
  isBannerOpen: boolean;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const isAuth = this.auth.isAuth();
    if (isAuth) this.router.navigate(['/todolist']);

    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      if (cookie.trim() == 'acceptCookie=true') {
        this.isBannerOpen = false;
        break;
      } else this.isBannerOpen = true;
    }

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

  async login() {
    try {
      if (this.email == ' ') {
        alert('Enter email');
        return;
      }
      if (this.password == ' ') {
        alert('Enter email');
        return;
      }

      await this.auth.login(this.email, this.password);
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword() {
    this.auth.resetPassword(this.email);
  }
}
