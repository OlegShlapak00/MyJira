import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {ITask} from '../../Models/Task';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {startWith, map} from 'rxjs/operators';
import {IUser} from '../../Models/User';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  taskCollection: AngularFirestoreCollection<ITask>;
  tasks: Observable<ITask[]>;
  users: Observable<IUser[]>;
  userCollection: AngularFirestoreCollection<IUser>;
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  assignee = new FormControl();
  taskName: string;
  taskDescription: string;

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit(): void {
    this.taskCollection = this.afs.collection('Tasks');
    this.tasks = this.taskCollection.valueChanges();
    this.userCollection = this.afs.collection('users');
    this.users = this.userCollection.valueChanges();
    this.users.subscribe(users => {
      users.map(user => {
        this.options.push(`${user.userName} ${user.userSurname}`);
      });
    });
    this.filteredOptions = this.assignee.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  addTask(): void {
    const newTask: ITask = {
      taskName: this.taskName,
      taskDescription: this.taskDescription,
      taskAssignee: this.assignee.value,
      taskStan: 'OPEN'
    };
    this.taskCollection.add(newTask);
  }
}
