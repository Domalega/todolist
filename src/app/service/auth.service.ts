import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userEmail: string | null = null;
  constructor(private auth: AngularFireAuth, private router: Router) {}

  async login(email: string, password: string) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      const today = new Date();
      today.setTime(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const expires = 'expires=' + today.toUTCString();
      document.cookie = `token=true; ${expires}`;
      document.cookie = `email=${email}; ${expires}`;
      this.router.navigate(['/todolist']);
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

  async getEmail(): Promise<string | null | undefined> {
    try {
      const user = await this.auth.currentUser;
      return user?.email;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  isAuth(): boolean {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      if (cookie.trim() == 'token=true') return true;
    }
    return false;
  }

  async resetPassword(email: string) {
    try {
      await this.auth.sendPasswordResetEmail(email);
      alert('Letter to change password was sent');
    } catch (error) {
      console.log(error);
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
