import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Card } from './shared/card.model';
import { MatDialog } from '@angular/material/dialog';
import { CardFormComponent } from './card-form/card-form.component';


@Component({
  selector: 'tl-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.styl']
})
export class CardListComponent implements OnInit {

  isEditMode: boolean;
  cards: Card[] = [
    {
      id: 1,
      name: 'AAA',
      description: `Description AAA`,
      date: new Date()
    },
    {
      id: 2,
      name: 'BBB',
      description: 'Description BBB',
      date: new Date()
    },
    {
      id: 3,
      name: 'CCC',
      description: 'Description CCC',
      date: new Date()
    }
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCardEdit(card: Card, e: Event) {
    console.log(card);
    e.stopImmediatePropagation();
    this.openDialog();
  }

  onCardDelete(card: Card, e: Event) {
    console.log(card);
    e.stopImmediatePropagation();
    this.cards = this.cards.filter(c => c.id !== card.id);
  }

  onCardDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

  onEditModeChange(checked: boolean) {
    this.isEditMode = checked;
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(CardFormComponent, {
      width: '250px',
      data: {name: 'a', animal: 'b'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ' + result);
    });
  }
}
