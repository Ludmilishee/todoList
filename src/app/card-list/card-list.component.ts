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
      date: new Date('03.12.2020 23:20:00')
    },
    {
      id: 2,
      name: 'BBB',
      description: 'Description BBB',
      date: new Date('03.24.2020 23:30:00')
    },
    {
      id: 3,
      name: 'CCC',
      description: 'Description CCC',
      date: new Date('03.21.2020 21:30:00')
    },
    {
      id: 4,
      name: 'ffff',
      description: 'Description fff',
      date: new Date()
    }
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCardAdd() {
    this.openCardForm({
      id: this.cards.length + 1,
      name: '',
      description: '',
      date: new Date()
    });
  }

  onCardEdit(card: Card, e: Event) {
    e.stopImmediatePropagation();
    this.openCardForm(card);
  }

  onCardDelete(card: Card, e: Event) {
    e.stopImmediatePropagation();
    this.cards = this.cards.filter(c => c.id !== card.id);
  }

  onCardDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

  onEditModeChange(checked: boolean) {
    this.isEditMode = checked;
  }

  private openCardForm(card: Card) {
    const dialogRef = this.dialog.open(CardFormComponent, {
      width: '250px',
      data: { ...card }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        const foundIndex = this.cards.findIndex(c => c.id === result.id);

        if (foundIndex === -1) {
          this.cards.unshift(result);
        } else {
          this.cards.splice(foundIndex, 1, result);
        }
      }
    });
  }
}
