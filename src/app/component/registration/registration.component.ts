import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  email: string = '';
  password: string = '';
  isBannerOpen: boolean;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
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
      let body = document.getElementById('bodyTodoReg');
      if (body) body.classList.add('dark');
    } else if (defaultTheme === 'light') {
      const body = document.getElementById('bodyTodoReg');
      if (body) body.classList.remove('dark');
    }
  }

  async registration() {
    try {
      if (this.email == ' ') {
        alert('Enter email');
        return;
      }
      if (this.password == ' ') {
        alert('Enter email');
        return;
      }

      await this.auth.registration(this.email, this.password);
    } catch (error) {
      console.log(error);
    }
  }
}
