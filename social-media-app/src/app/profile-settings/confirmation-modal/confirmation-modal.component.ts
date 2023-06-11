import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() showModal: boolean;
  @Output() deleteConfirmed = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  confirmDelete() {
    this.deleteConfirmed.emit();
    this.closeModal();
  }

  closeModal() {
    this.modalClosed.emit();
  }

}
