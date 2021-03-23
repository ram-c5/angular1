import { Component } from '@angular/core';
import { Note } from './note';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  errMessage: string;

  note: Note = new Note();
  notes: Array<Note> = [];

  constructor(private notesService: NotesService) {

  }

  ngOnInit() {
    // publisher is getting the data
    this.notesService.getNotes().subscribe(
      data => {
        console.log(data);
        this.notes = data;
      },
      error => {
        this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found';
      }
    );
  }

  takeNote() {
    console.log(this.note);

    if (this.note.title == "" || this.note.text == ""){
      this.errMessage = "Title and Text both are required fields";
    } else {
      this.notesService.addNote(this.note).subscribe(
        data => {
          this.notes.push(data);
        },
        error => {
          this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found';
        }
      );
    }

    this.note = new Note();
  }

}
