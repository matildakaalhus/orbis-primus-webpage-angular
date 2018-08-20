import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {Http, Headers} from '@angular/http';
import { UtilitiesService } from '../../services/utilities.service';

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

  constructor(private utilitiesService: UtilitiesService, private http: Http) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.isValidInput()) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

      return this.http.post('http://orbisprimus.se/ContactMailHandler.php',
      `question=${ this.questionInput }&contactName=${ this.nameContactPersonInput }
      &contactEmail=${ this.emailContactPersonInput }`,
        { headers: headers })
      .subscribe(res => console.log(res));
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
}
