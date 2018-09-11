import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  isSuccessful = false;

  constructor(private modalService: ModalService) { }

  @ViewChild('frame') frame;

  ngOnInit() {
    this.modalService.isOpenChange.subscribe(
      (isOpen) => {
        if (isOpen) {
          this.frame.show();
        }
      }
    );

    this.modalService.isSuccessfulChange.subscribe(
      (isSuccessful) => {
        this.isSuccessful = isSuccessful;
      }
    );
  }

  hide() {
    this.frame.hide();
    this.modalService.hide();
  }

}
