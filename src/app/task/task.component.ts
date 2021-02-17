import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IUser} from '../../Models/User';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  users: Observable<IUser[]>;
  userCollection: AngularFirestoreCollection<IUser>;
  options: string[] = [];
  assignee = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private afs: AngularFirestore) {
  }

  ngOnInit(): void {
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

  updateTask(): void {
    if (this.assignee.value !== null) {
      this.data.assignee = this.assignee.value;
    }
    this.afs.doc(`Tasks/${this.data.id}`)
      .update({
        taskAssignee: this.data.assignee,
        taskDescription: this.data.description,
        taskName: this.data.name,
        taskStan: this.data.stan
      });
  }

}
