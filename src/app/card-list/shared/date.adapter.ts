import { NativeDateAdapter } from '@angular/material/core';
import { formatDate } from '@angular/common';

export const APP_DATE_FORMATS = {
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
    dateInput: 'input',
    monthYearLabel: 'inputMonth',
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: string): string {
    if (displayFormat === 'input') {

      return formatDate(date, 'dd.MM.yyyy', 'ru-RU');
    } else if (displayFormat === 'inputMonth') {

      return formatDate(date, 'MMM yyyy', 'ru-RU');
    } else {

      return date.toDateString();
    }
  }
}
