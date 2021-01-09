import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {ITask} from '../../Models/Task';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  taskCollection: AngularFirestoreCollection<ITask>;
  tasks: Observable<ITask[]>;

  taskName: string;
  taskDescription: string;
  assignee: string;
  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
  this.taskCollection = this.afs.collection('Tasks');
  this.tasks = this.taskCollection.valueChanges();

  }
  addTask(): void {
    const newTask: ITask = {
      taskName: this.taskName,
      taskDescription: this.taskDescription,
      taskAssignee: this.assignee,
      taskStan: 'OPEN'
    };
    this.taskCollection.add(newTask);
  }
}
