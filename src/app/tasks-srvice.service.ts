import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {ITask} from '../Models/Task';

@Injectable({
  providedIn: 'root'
})
export class TasksSrviceService {
  taskCollection: AngularFirestoreCollection<ITask>;
  tasks: Observable<ITask[]>;

  constructor(
    public firestore: AngularFirestore,
    private afs: AngularFirestore,
    public firebaseService: AuthService
  ) {
    this.taskCollection = this.afs.collection('Tasks');
    this.tasks = this.taskCollection.valueChanges({idField: 'taskId'});
  }
  getTasks(): Observable<ITask[]> {
   return this.tasks;
  }
  updateTaskStan(taskId , currentState): void {
    this.afs.collection('Tasks').doc(taskId).update({taskStan: currentState});
  }
}
