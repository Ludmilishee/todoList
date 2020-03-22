import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToDo } from '../shared/card.model';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tl-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFormComponent implements OnInit {

  time: string;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CardFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ToDo
  ) {}

  ngOnInit(): void {
    this.time = formatDate(this.data.date, 'HH:mm', 'ru-RU');

    this.form = new FormGroup({
      name: new FormControl(this.data.name, Validators.required),
      description: new FormControl(this.data.description),
      date: new FormControl(this.data.date, Validators.required),
      time: new FormControl(this.time, Validators.required)
    });
  }

  get f() { return this.form.controls; }

  onOkClick(): void {
    const formData = this.form.value;
    const [ hours, mins ] = formData.time.split(':');

    for (const k in formData) {
      if (formData.hasOwnProperty(k) && k !== 'time') {
        this.data[k] = formData[k];
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
