import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

import { formatDate, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_DATE_FORMATS, AppDateAdapter } from '../shared/date.adapter';
import { Platform } from '@angular/cdk/platform';
registerLocaleData(localeRu, 'ru');

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  const mockToDo = {
    id: 0,
    name: 'Новая задача',
    description: '',
    date: new Date()
  };
  const adapter = new AppDateAdapter('', {} as Platform);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      declarations: [ TodoFormComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: mockToDo },
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
        { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен создавать компонент', () => {
    expect(component).toBeTruthy();
  });

  it(`должен заполнять поле ввода Название значением ${mockToDo.name}`, () => {
    expect(fixture.debugElement.query(By.css('#name')).nativeElement.value).toEqual(mockToDo.name);
  });

  it(`должен заполнять поле ввода Описание значением ${mockToDo.description}`, () => {
    expect(fixture.debugElement.query(By.css('#description')).nativeElement.value).toEqual(mockToDo.description);
  });

  it(`должен заполнять поле ввода Дата значением ${adapter.format(mockToDo.date, 'input')}`, () => {
    expect(
      fixture.debugElement.query(By.css('#date')).nativeElement.value)
      .toEqual(adapter.format(mockToDo.date, 'input')
    );
  });
});
