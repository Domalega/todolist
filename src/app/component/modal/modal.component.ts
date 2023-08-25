import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/model/note';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  @Input() isShowModal: boolean;
  @Input() selectedNote: Note;
  @Output() closeModal = new EventEmitter<boolean>();

  ngOnInit(): void {
    console.log(this.selectedNote);
  }

  onCloseModal() {
    this.closeModal.emit(false);
  }

  handleClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
