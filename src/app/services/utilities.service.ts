import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  /**
   * Returns a string representation of date in given format
   * or in YYYY-MM-DD format if no format is specified
   */
  getDateString(date: Date, format?: string): string {
    format = format ? format : 'YYYY-MM-DD';
    return date ? moment(date).format(format) : '-';
  }
}
