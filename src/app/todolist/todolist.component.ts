import { Component, OnInit } from '@angular/core';
import { TodolistService} from '../todolist.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  providers : [TodolistService]
})
export class TodolistComponent implements OnInit {

  todoArray: any []
 
  constructor(private todolistService: TodolistService) { }

  ngOnInit() {
    this.todolistService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.todoArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.todoArray.push(x);
      })

      //sort array isChecked false  -> true
        this.todoArray.sort((a,b) => {
          return a.isChecked - b.isChecked;
        })
    });
  }

  onAdd(itemTitle) {
    this.todolistService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck($key: string,isChecked) {
    this.todolistService.checkOrUnCheckTitle($key,!isChecked);
  }

  onEdit($key : string,title){
    this.todolistService.editTitle($key,title);
  }

  onDelete($key : string){
    this.todolistService.removeTitle($key);
  }
  

}

