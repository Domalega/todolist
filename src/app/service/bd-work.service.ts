import { Injectable } from '@angular/core';
import { Note } from '../model/note';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BdWorkService {
  public static url =
    'https://todolist-angul-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) {}

  async addNote(note: Note) {
    const someData = await this.http
      .post<any>(`${BdWorkService.url}/${note.userId}.json`, note)
      .toPromise();
    console.log(someData);

    return someData;
  }

  async getNotes() {}

  async deleteNote(noteId: string) {}
}
