import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {ITask} from '../Models/Task';
import {filter} from 'rxjs/operators';

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
    this.taskCollection = this.afs.collection('Tasks', ref => {
      return ref.where('taskProject', '==', 'Def');
    });
    this.tasks = this.taskCollection.valueChanges({idField: 'taskId'});
  }

  getTasks(project: string = 'Def'): Observable<ITask[]> {
    this.taskCollection = this.afs.collection('Tasks', ref => {
      return ref.where('taskProject', '==', project);
    });
    this.tasks = this.taskCollection.valueChanges({idField: 'taskId'});
    return this.tasks;
  }

  updateTaskStan(taskId, currentState): void {
    this.afs.collection('Tasks').doc(taskId).update({taskStan: currentState});
  }
}
