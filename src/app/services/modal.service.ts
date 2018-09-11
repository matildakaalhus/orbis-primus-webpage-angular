import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class ModalService {

  isOpen = false;
  isSuccessful = false;

  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter();
  @Output() isSuccessfulChange: EventEmitter<boolean> = new EventEmitter();

  show(successful: boolean) {
    this.isOpen = true;
    this.isSuccessful = successful;
    this.isSuccessfulChange.emit(this.isSuccessful);
    this.isOpenChange.emit(this.isOpen);
  }

  hide() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

}
