import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

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
