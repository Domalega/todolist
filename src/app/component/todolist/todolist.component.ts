import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
})
export class TodolistComponent {
  constructor(private auth: AuthService) {}
  logOut() {
    this.auth.logOut();
  }
}
