import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  async login(email: string, password: string) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      const today = new Date();
      today.setTime(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const expires = 'expires=' + today.toUTCString();
      document.cookie = `token=true; ${expires}`;
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.log(error);
      alert('Email or password is wrong');
      this.router.navigate(['/login']);
    }
  }

  async registration(email: string, password: string) {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
      alert('Login is busy');
      this.router.navigate(['/registration']);
    }
  }

  async logOut() {
    try {
      await this.auth.signOut();
      document.cookie =
        'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
