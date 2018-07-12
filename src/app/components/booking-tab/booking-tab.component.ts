import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-booking-tab',
  templateUrl: './booking-tab.component.html',
  styleUrls: ['./booking-tab.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class BookingTabComponent implements OnInit {

  // Form variables
  eventDescriptionInput = '';
  locationInput = '';
  dateInput = '';
  datepickerInput = '';
  otherInput = '';

  // Form Controls
  eventDescriptionControl = new FormControl('', Validators.required);
  locationControl = new FormControl('', Validators.required);
  otherControl = new FormControl();
  dateControl = new FormControl('', Validators.required);
  datePickerControl = new FormControl();
  timeControl = new FormControl('', Validators.required);

  constructor(private utilitiesService: UtilitiesService) { }

  ngOnInit() {
  }

  /**
   * Sets the datePicker the date entered in the input field.
   */
  setDateToDatePicker() {
    if (!this.dateControl.hasError('required') && !this.dateControl.hasError('dateFormat')) {
      this.datepickerInput = this.dateInput; // Set date in Datepicker
    }
  }
  /**
   * Sets date from datePicker to visible input field in YYYY-MM-DD format
   * @param data Date selected in datePicker
   */
  setDateFromDatepicker(data: any) {
    if (data.value != null) {
      this.dateInput = this.utilitiesService.getDateString(data.value);
    }
  }
  /**
   * Returns true if entered event description is valid, else false.
   */
  isValidEventDescription() {
    return !this.eventDescriptionControl.hasError('required');
  }

  /**
   * Returns true if entered location is valid, else false.
   */
  isValidLocation() {
    return !this.locationControl.hasError('required');
  }

  /**
   * Returns true if entered date is valid, else false.
   */

   isValidDate() {
    return !this.dateControl.hasError('required') && !this.dateControl.hasError('dateFormat');
  }

  /**
   * Returns true if entered location is valid, else false.
   */
  isValidTime() {
    // TODO! return !this.locationControl.hasError('required');
  }


  /**
   * Returns true if everything in the form is valid, else false
   */
  isValidInput() {
    return (
      this.isValidEventDescription() &&
      this.isValidLocation() &&
      this.isValidDate() &&
      this.isValidTime()
    );
  }

  /**
   * Submits entered information and sends an email to bokning@orbisprimus.se
   */
  submit() {
    if (this.isValidInput()) {
      // Submit
    }
  }


}
