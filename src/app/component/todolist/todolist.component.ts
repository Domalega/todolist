import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { BdWorkService } from 'src/app/service/bd-work.service';
import { Note } from 'src/app/model/note';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
})
export class TodolistComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private bdService: BdWorkService,
    private router: Router
  ) {}

  ngOnInit() {
    const isAuth = this.authService.isAuth();
    if (!isAuth) this.router.navigate(['/login']);

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  async submit() {
    try {
      const { title } = this.form.value;
      const userEmail = await this.authService.getEmail();

      const note: Note = {
        content: title,
        date: new Date().toUTCString(),
        email: <string>userEmail,
      };

      const createNote = await this.bdService.addNote(note);
      if (createNote) this.form.reset();
    } catch (error) {
      console.log(error);
    }
  }
  logOut() {
    this.authService.logOut();
  }
}
