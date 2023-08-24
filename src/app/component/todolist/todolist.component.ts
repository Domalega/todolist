import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { BdWorkService } from 'src/app/service/bd-work.service';
import { Note } from 'src/app/model/note';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { noteWorks } from '../../animation/notesWork';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  animations: [noteWorks],
})
export class TodolistComponent implements OnInit {
  form: FormGroup;
  notes: Note[] | null = null;
  isSubmit: boolean = false;
  noteToDelete: any;

  constructor(
    private authService: AuthService,
    private bdService: BdWorkService,
    private router: Router
  ) {}

  ngOnInit() {
    const defaultTheme = localStorage.getItem('theme');
    if (defaultTheme === null) localStorage.setItem('theme', 'light');
    else if (defaultTheme === 'dark') {
      const body = document.getElementById('bodyTodoMain');
      if (body) body.classList.add(`dark`);
    }
    const isAuth = this.authService.isAuth();
    if (!isAuth) this.router.navigate(['/login']);

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
    });
    this.getNotes();
  }

  async submit() {
    try {
      this.isSubmit = true;
      const { title } = this.form.value;
      const userEmail = await this.authService.getEmail();
      const userId = await this.authService.getUserId();

      const note: Note = {
        userId: <string>userId,
        content: title,
        date: new Date().toUTCString(),
        email: <string>userEmail,
      };

      this.bdService.addNote(note).subscribe(() => {
        this.isSubmit = false;
        this.form.reset();
        this.getNotes();
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteNoteWithTransition(note: Note) {
    this.noteToDelete = note;
    setTimeout(() => {
      this.deleteNote(note);
    }, 300);
  }

  deleteNote(note: Note) {
    this.bdService.deleteNote(note).subscribe(() => {
      this.getNotes();
    });
  }

  getNotes() {
    const isAuth = this.authService.isAuth();
    if (!isAuth) this.router.navigate(['/login']);

    this.authService.getUserIdRXJS().subscribe((user) => {
      this.bdService
        .getNote(<string>user?.uid)
        .pipe(map((notesFromBD) => Object.values(notesFromBD)))
        .subscribe((notesFromBD) => {
          this.notes = notesFromBD;
        });
    });
  }
}
