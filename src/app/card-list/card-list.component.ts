import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToDo } from './shared/card.model';
import { MatDialog } from '@angular/material/dialog';
import { CardFormComponent } from './card-form/card-form.component';
import { ToDosService } from '../services/todos.service';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'tl-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent implements OnInit, OnDestroy {

  cards: ToDo[];
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
      .subscribe((data: ToDo[]) => this.cards = data);
  }

  onCardAdd() {
    this.openCardForm({
      id: 0,
      name: 'Новая задача',
      description: '',
      date: new Date()
    });
  }

  onCardEdit(card: ToDo, e: Event) {
    e.stopImmediatePropagation();
    this.openCardForm(card);
  }

  onCardDelete(card: ToDo, e: Event) {
    e.stopImmediatePropagation();
    this.toDosService.deleteToDo(card.id)
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((todo: ToDo) => {
        this.cards = this.cards.filter(c => c.id !== todo.id);
      });
  }

  onCardDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

  onEditModeChange(checked: boolean) {
    this.isEditMode = checked;
  }

  private openCardForm(card: ToDo) {
    const dialogRef = this.dialog.open(CardFormComponent, {
      width: '250px',
      data: { ...card }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const foundIndex = this.cards.findIndex(c => c.id === result.id);

        if (foundIndex === -1) {
          this.toDosService.addToDo(result)
            .pipe(takeUntil(this.unSubscriber$))
            .subscribe((todo: ToDo) => {
              this.cards.unshift(todo);
            });
        } else {
          this.toDosService.editToDo(result)
            .pipe(takeUntil(this.unSubscriber$))
            .subscribe((todo: ToDo) => {
              this.cards.splice(foundIndex, 1, todo);
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
