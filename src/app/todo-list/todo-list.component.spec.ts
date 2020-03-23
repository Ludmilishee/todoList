import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoStateDirective } from './shared/todo-state.directive';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  const mockToDo = {
    id: 0,
    name: 'a',
    description: 'a',
    date: new Date()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DragDropModule,
        MatButtonModule,
        MatExpansionModule,
        MatIconModule,
        MatSlideToggleModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      declarations: [
        TodoListComponent,
        TodoFormComponent,
        TodoStateDirective
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен создавать компонент', () => {
    expect(component).toBeTruthy();
  });

  it('должен вызывать обработчик на добавление задачи', () => {
    spyOn(component, 'onToDoAdd');

    const button = fixture.debugElement.nativeElement.querySelector('.list-edit-panel > button');
    button.click();

    expect(component.onToDoAdd).toHaveBeenCalled();
  });

  it('должен вызывать обработчик на редактирование задачи', () => {
    const editButton = fixture.debugElement.query(By.css('.edit-panel > button:nth-of-type(1)'));

    spyOn(component, 'onToDoEdit');
    editButton.triggerEventHandler('click', null);

    expect(component.onToDoEdit).toHaveBeenCalled();
  });

  it('должен открывать форму на редактирование задачи', () => {
    component.onToDoEdit(mockToDo, { stopImmediatePropagation: () => {}} as Event);
    expect(component.dialog.openDialogs.length).toEqual(1);
  });

  it('должен вызывать обработчик на удаление задачи', () => {
    spyOn(component, 'onToDoDelete');

    const button = fixture.debugElement.nativeElement.querySelector('.edit-panel > button:nth-of-type(2)');
    button.click();

    expect(component.onToDoDelete).toHaveBeenCalled();
  });
});
