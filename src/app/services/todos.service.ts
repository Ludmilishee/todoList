import { Injectable } from '@angular/core';
import { ToDo } from '../todo-list/shared/todo.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDosService {

  private data: ToDo[] = [
    {
      id: 1,
      name: 'Начать делать тестовое в СКБ Лаб',
      description: 'Тестовое как тестовое',
      date: new Date(new Date().setDate(new Date().getDate() - 5))
    },
    {
      id: 4,
      name: 'Сделать его уже наконец',
      description: 'Уже почти',
      date: new Date(new Date().setDate(new Date().getDate() - 1))
    },
    {
      id: 3,
      name: 'Что-то ещё',
      description: 'Бла-бла',
      date: new Date(new Date().setDate(new Date().getDate() + 2))
    },
    {
      id: 2,
      name: 'Завоевать мир',
      description: 'Ehehehehe',
      date: new Date(new Date().setDate(new Date().getDate() + 30))
    }
  ];

  constructor() { }

  getToDoData() {
    this.getToDoId();
    return of([ ...this.data ] as ToDo[]);
  }

  addToDo(toDo: ToDo) {
    toDo.id = this.getToDoId();
    this.data.unshift(toDo);

    return of(toDo);
  }

  editToDo(toDo: ToDo) {
    const foundIndex = this.data.findIndex(item => item.id === toDo.id);
    if (foundIndex !== -1) {
      this.data.splice(foundIndex, 1, toDo);
    }

    return of(toDo);
  }

  deleteToDo(id: number) {
    const delIndex = this.data.findIndex(item => item.id === id);
    let delToDo;

    if (delIndex !== -1) {
      delToDo = this.data[delIndex];
      this.data.splice(delIndex, 1);
    }

    return of(delToDo);
  }

  private getToDoId() {
    const ids = this.data.map(c => c.id).sort();
    let idx = 0;

    for (const id of ids) {
      idx++;
      if (id !== idx) {
        return idx;
      }
    }
    return ids.length + 1;
  }
}
