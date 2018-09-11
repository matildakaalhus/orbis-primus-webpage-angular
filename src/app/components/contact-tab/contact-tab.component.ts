import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import {Http, Headers} from '@angular/http';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-contact-tab',
  templateUrl: './contact-tab.component.html',
  styleUrls: ['./contact-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactTabComponent implements OnInit {

  // Form variables
  questionInput = '';
  nameContactPersonInput = '';
  emailContactPersonInput = '';

  // Form Controls
  questionControl = new FormControl('', Validators.required);
  nameContactPersonControl = new FormControl('', Validators.required);
  emailContactPersonControl = new FormControl('', Validators.required);

  @ViewChild('contactForm') contactForm: NgForm;

  constructor(private http: Http, private modalService: ModalService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.isValidInput()) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

      let success;
      return this.http.post('http://orbisprimus.se/ContactMailHandler.php',
      `question=${ this.questionInput }&contactName=${ this.nameContactPersonInput }
      &contactEmail=${ this.emailContactPersonInput }`,
        { headers: headers })
      .subscribe(result => {
        console.log(result['_body']);
        const resStr = String(result['_body']);
        success = resStr === 'SUCCESS' || resStr ===
        'ERROR: Contact email was sent but not the confirmation email to sender.';
        if (success) {
          this.resetForm();
        }
      },
      error => {
        this.modalService.show(false);
      },
      () => {
        this.modalService.show(success);
      });
    }
  }

  /**
   * Returns true if entered question is valid, else false.
   */
  isValidQuestion() {
    return !this.questionControl.hasError('required');
  }

  /**
   * Returns true if entered name of contact person is valid, else false.
   */
  isValidNameContactPerson() {
    return !this.nameContactPersonControl.hasError('required');
  }

  /**
   * Returns true if entered email of contact person is valid, else false.
   */
  isValidEmailContactPerson() {
    return !this.emailContactPersonControl.hasError('required');
  }

  /**
   * Returns true if everything in the form is valid, else false
   */
  isValidInput() {
    return (
      this.isValidQuestion() &&
      this.isValidNameContactPerson() &&
      this.isValidEmailContactPerson()
    );
  }

  resetForm() {
    this.questionControl.reset();
    this.nameContactPersonControl.reset();
    this.emailContactPersonControl.reset();
    this.contactForm.resetForm();
  }
}
