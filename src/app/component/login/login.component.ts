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

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const isAuth = this.auth.isAuth();
    if (isAuth) this.router.navigate(['/todolist']);
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
