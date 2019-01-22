import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import {Http, Headers} from '@angular/http';
import { UtilitiesService } from '../../services/utilities.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-apply-tab',
  templateUrl: './apply-tab.component.html',
  styleUrls: ['./apply-tab.component.css']
})

export class ApplyTabComponent implements OnInit {
    // Form variables
    nameInput = '';
    educationInput = '';
    emailInput = '';
    interestsInput = '';
    engagementsInput = '';
    experienceInput = '';
    instrumentsInput = '';
    comfortableInput = '';
    rhymeInput = '';
    otherInput = '';

    // Form Controls
    nameControl = new FormControl('', Validators.required);
    educationControl = new FormControl('', Validators.required);
    emailControl = new FormControl('', Validators.required);
    interestsControl = new FormControl('', Validators.required);
    engagementsControl = new FormControl('', Validators.required);
    experienceControl = new FormControl('', Validators.required);
    instrumentsControl = new FormControl('', Validators.required);
    comfortableControl = new FormControl('', Validators.required);
    rhymeControl = new FormControl('', Validators.required);
    otherControl = new FormControl();

    @ViewChild('applyForm') applyForm: NgForm;

    constructor(
      private utilitiesService: UtilitiesService,
      private http: Http,
      private modalService: ModalService) { }

    ngOnInit() {
    }

    onSubmit() {
      if (this.isValidInput()) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        let success;
        return this.http.post('http://orbisprimus.se/ApplicationMailHandler.php',
        `name=${ this.nameInput }&education=${ this.educationInput }&email=${ this.emailInput }
        &interests=${ this.interestsInput }&engagements=${ this.engagementsInput }
        &experience=${ this.experienceInput }&instruments=${ this.instrumentsInput }
        &comfortable=${ this.comfortableInput }&rhyme=${ this.rhymeInput }
        &other=${ this.otherInput }`,
          { headers: headers })
          .subscribe(result => {
            console.log(result['_body']);
            const resStr = String(result['_body']);
            success = resStr === 'SUCCESS' || resStr ===
            'ERROR: Application email was sent but not the confirmation email to sender.';
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
     * Returns true if entered name is valid, else false.
     */
    isValidName() {
      return !this.nameControl.hasError('required');
    }

    /**
     * Returns true if entered education is valid, else false.
     */
    isValidEducation() {
      return !this.educationControl.hasError('required');
    }

    /**
     * Returns true if entered email is valid, else false.
     */
    isValidEmail() {
      return !this.emailControl.hasError('required');
    }

    /**
     * Returns true if entered interests are valid, else false.
     */
    isValidInterests() {
      return !this.interestsControl.hasError('required');
    }

    /**
     * Returns true if entered engagements are valid, else false.
     */
    isValidEngagements() {
      return !this.engagementsControl.hasError('required');
    }

    /**
     * Returns true if entered experience is valid, else false.
     */
    isValidExperience() {
      return !this.experienceControl.hasError('required');
    }

    /**
     * Returns true if entered instruments are valid, else false.
     */
    isValidInstruments() {
      return !this.instrumentsControl.hasError('required');
    }

    /**
     * Returns true if entered comfortable is valid, else false.
     */
    isValidComfortable() {
      return !this.comfortableControl.hasError('required');
    }

    /**
     * Returns true if entered rhyme is valid, else false.
     */
    isValidRhyme() {
      return !this.rhymeControl.hasError('required');
    }

    /**
     * Returns true if everything in the form is valid, else false
     */
    isValidInput() {
      return (
        this.isValidName() &&
        this.isValidEducation() &&
        this.isValidEmail() &&
        this.isValidInterests() &&
        this.isValidEngagements() &&
        this.isValidExperience() &&
        this.isValidInstruments() &&
        this.isValidComfortable() &&
        this.isValidRhyme()
      );
    }

    resetForm() {
      this.nameControl.reset();
      this.educationControl.reset();
      this.interestsControl.reset();
      this.engagementsControl.reset();
      this.experienceControl.reset();
      this.instrumentsControl.reset();
      this.comfortableControl.reset();
      this.rhymeControl.reset();
      this.otherControl.reset();
      this.applyForm.resetForm();
    }
  }

