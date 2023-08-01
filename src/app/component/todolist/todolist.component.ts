import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { BdWorkService } from 'src/app/service/bd-work.service';
import { Note } from 'src/app/model/note';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  animations: [
    trigger('slideOut', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(100%)' })),
      transition('in => out', animate('300ms ease-out')),
    ]),
  ],
})
export class TodolistComponent implements OnInit {
  form: FormGroup;
  notes: Note[] | null = null;
  noteToDelete: any;

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

    this.getNotes();
  }

  async submit() {
    try {
      const { title } = this.form.value;
      const userEmail = await this.authService.getEmail();
      const userId = await this.authService.getUserId();

      const note: Note = {
        userId: <string>userId,
        content: title,
        date: new Date().toUTCString(),
        email: <string>userEmail,
      };

      this.bdService.addNote(note).subscribe((note) => {
        this.form.reset();
        this.getNotes();
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteNoteWithTransition(note: any) {
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

  logOut() {
    this.authService.logOut();
  }
}
