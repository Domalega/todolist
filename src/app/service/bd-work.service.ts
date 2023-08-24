import { Injectable } from '@angular/core';
import { Note } from '../model/note';
import { HttpClient } from '@angular/common/http';
import { CreateResponse } from '../model/response';
import { Observable, map, switchMap } from 'rxjs';
import { UserData } from '../model/user-data';

@Injectable({
  providedIn: 'root',
})
export class BdWorkService {
  public static url =
    'https://todolist-angul-default-rtdb.europe-west1.firebasedatabase.app';

  note$: Observable<Note[]>;

  constructor(private http: HttpClient) {}

  addNote(note: Note) {
    return this.http
      .post<CreateResponse>(`${BdWorkService.url}/${note.userId}.json`, note)
      .pipe(
        switchMap((res) => {
          note.id = res.name;
          return this.http.put(
            `${BdWorkService.url}/${note.userId}/${note.id}.json`,
            note
          );
        }),
        map(() => ({ ...note }))
      );
  }

  getNote(userId: string) {
    return this.http.get<Note[]>(`${BdWorkService.url}/${userId}.json`).pipe(
      map((notes) => {
        if (!notes) return [];
        return notes;
      })
    );
  }

  deleteNote(note: Note) {
    return this.http.delete<Note>(
      `${BdWorkService.url}/${note.userId}/${note.id}.json`,
      { body: note }
    );
  }

  getUserData(userId: string) {
    this.http.get<UserData>(`${BdWorkService.url}/${userId}/userOptions.json`);
  }

  addUserData(userData: UserData) {
    return this.http.post<UserData>(
      `${BdWorkService.url}/${userData.userId}/userOptions.json`,
      userData
    );
  }

  updateData(userData: UserData) {
    return this.http.put<UserData>(
      `${BdWorkService.url}/${userData.userId}/userOptions.json`,
      userData
    );
  }
}
