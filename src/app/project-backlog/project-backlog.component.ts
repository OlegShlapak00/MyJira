import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddTaskComponent} from '../add-task/add-task.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {ITask} from '../../Models/Task';
import {Observable} from 'rxjs';
import {TaskComponent} from '../task/task.component';
import {IUser} from '../../Models/User';

@Component({
  selector: 'app-project-backlog',
  templateUrl: './project-backlog.component.html',
  styleUrls: ['./project-backlog.component.css']
})

export class ProjectBacklogComponent implements OnInit {
  taskCollection: AngularFirestoreCollection<ITask>;
  tasks: Observable<ITask[]>;
  userCollection: AngularFirestoreCollection<IUser>;
  users: Observable<IUser[]>;
  options = [];
  @Input() user: IUser;
  todo = [];
  done = [];
  progress = [];

  constructor(public dialog: MatDialog, private afs: AngularFirestore) {
  }

  openDialog(): void {
    this.dialog.open(AddTaskComponent);
  }
  openTask(data): void {
    this.dialog.open(TaskComponent,
      {
        data: {
          id: data.taskId,
          name: data.taskName,
          description: data.taskDescription,
          assignee: data.taskAssignee,
          stan: data.taskStan,
        }
      });
  }

  ngOnInit(): void {
    this.taskCollection = this.afs.collection('Tasks');
    this.tasks = this.taskCollection.valueChanges({idField: 'taskId'});
    this.subscribing();
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      const dragItem: any = event.container.data[event.currentIndex];
      if (event.container.element.nativeElement.classList.contains('toDoList')) {
        this.afs.collection('Tasks').doc(dragItem.taskId).update({taskStan: 'OPEN'});
      }
      if (event.container.element.nativeElement.classList.contains('progressList')) {
        this.afs.collection('Tasks').doc(dragItem.taskId).update({taskStan: 'PROGRESS'});
      }
      if (event.container.element.nativeElement.classList.contains('doneList')) {
        this.afs.collection('Tasks').doc(dragItem.taskId).update({taskStan: 'DONE'});
      }
    }
  }
  subscribing(): void {
    this.tasks.subscribe(tasks => {     // Bed subscribe, but works
      this.todo = [];
      this.done = [];
      this.progress = [];
      tasks.forEach(task => {
        if (task.taskStan === 'OPEN') {
          this.todo.push(task);
        }
        if (task.taskStan === 'PROGRESS') {
          this.progress.push(task);
        }
        if (task.taskStan === 'DONE') {
          this.done.push(task);
        }
      });
    });
  }
  myTask(): void {
    this.taskCollection = this.afs.collection('Tasks', ref => {
      return ref.where('taskAssignee', '==', this.user.userName + ' ' + this.user.userSurname);
    });
    this.tasks = this.taskCollection.valueChanges({idField: 'taskId'});
    this.subscribing();
  }
  allTask(): void {
    this.taskCollection = this.afs.collection('Tasks');
    this.tasks = this.taskCollection.valueChanges({idField: 'taskId'});
    this.subscribing();
  }
}



