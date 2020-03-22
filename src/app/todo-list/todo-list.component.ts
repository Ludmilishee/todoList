import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToDo } from './shared/todo.model';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { ToDosService } from '../services/todos.service';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'tl-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit, OnDestroy {

  toDos: ToDo[];
  isEditMode = true;

  private unSubscriber$: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private dialog: MatDialog,
    private toDosService: ToDosService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.toDosService.getToDoData()
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((data: ToDo[]) => this.toDos = data);
  }

  onToDoAdd() {
    this.openToDoForm({
      id: 0,
      name: 'Новая задача',
      description: '',
      date: new Date()
    });
  }

  onToDoEdit(toDo: ToDo, e: Event) {
    e.stopImmediatePropagation();
    this.openToDoForm(toDo);
  }

  onToDoDelete(toDo: ToDo, e: Event) {
    e.stopImmediatePropagation();
    this.toDosService.deleteToDo(toDo.id)
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((res: ToDo) => {
        this.toDos = this.toDos.filter(c => c.id !== res.id);
      });
  }

  onToDoDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.toDos, event.previousIndex, event.currentIndex);
  }

  onEditModeChange(checked: boolean) {
    this.isEditMode = checked;
  }

  private openToDoForm(toDo: ToDo) {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '250px',
      data: { ...toDo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const foundIndex = this.toDos.findIndex(c => c.id === result.id);

        if (foundIndex === -1) {
          this.toDosService.addToDo(result)
            .pipe(takeUntil(this.unSubscriber$))
            .subscribe((res: ToDo) => {
              this.toDos.unshift(res);
            });
        } else {
          this.toDosService.editToDo(result)
            .pipe(takeUntil(this.unSubscriber$))
            .subscribe((res: ToDo) => {
              this.toDos.splice(foundIndex, 1, res);
            });
        }
        this.cd.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.unSubscriber$.next(null);
    this.unSubscriber$.complete();
  }
}
