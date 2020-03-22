import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Card } from '../shared/card.model';
import { formatDate } from '@angular/common';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tl-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.styl']
})
export class CardFormComponent implements OnInit {

  time: string;

  constructor(
    public dialogRef: MatDialogRef<CardFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) {}

  form;

  ngOnInit(): void {
    this.time = formatDate(this.data.date, 'HH:mm', 'ru-RU');

    this.form = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(this.data.description, Validators.required),
      date: new FormControl(this.data.date, Validators.required),
      time: new FormControl(this.time, Validators.required)
    });
  }

  onOkClick(): void {
    const [ hours, mins ] = this.form.value.time.split(':');

    for (const k in this.form.value) {
      if (k !== 'time') {
        this.data[k] = this.form.value[k];
      }
    }

    this.data.date = new Date(
      this.data.date.getFullYear(),
      this.data.date.getMonth(),
      this.data.date.getDate(),
      Number(hours),
      Number(mins),
      0
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
