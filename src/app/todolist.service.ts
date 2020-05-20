import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

@Injectable()
export class TodolistService {

  toDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

    getToDoList() {
      this.toDoList = this.firebasedb.list('titles');
      return this.toDoList;
    }


  
    addTitle(title: string) {
      this.toDoList.push({
        title: title,
        isChecked: false
      });
    }
  
    checkOrUnCheckTitle($key: string, flag: boolean) {
      this.toDoList.update($key, { isChecked: flag });
    }
  
    removeTitle($key: string) {
      this.toDoList.remove($key);
    }

    editTitle($key: string, result: string){
      let title = prompt("Edit Task Title", result);
      if(title != null && title != ""){
       this.toDoList.update($key, {title: title});
      }
  }
}
