import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Card } from '../shared/card.model';
import { formatDate } from '@angular/common';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

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

  ngOnInit(): void {
    this.time = formatDate(this.data.date, 'HH:mm', 'ru-RU');
    console.log(formatDate(this.data.date, 'HH:mm', 'ru-RU'));
  }

  onOkClick(): void {
    const [ hours, mins ] = this.time.split(':');
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
