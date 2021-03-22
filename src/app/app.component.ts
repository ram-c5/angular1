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
        this.errMessage = error;
      }
    );
  }

  takeNote() {
    console.log(this.note);

    this.notesService.addNote(this.note).subscribe(
      data => {
        this.notes.push(data);
      },
      error => {
        this.errMessage = error;
      }
    );

    this.note = new Note();
  }

}
