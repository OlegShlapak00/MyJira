import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {IUser} from '../Models/User';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  usersCollection: AngularFirestoreCollection<IUser>;
  users: Observable<IUser[]>;

  constructor(
    public firestore: AngularFirestore,
    private afs: AngularFirestore,
    public firebaseService: AuthService) {
  }


    getCurrUser(): Observable<IUser[]> {
    this.usersCollection =  this.afs.collection('users', ref => {
      return ref.where('userEmail', '==', this.firebaseService.getUserEmail()).limit(1);
    });
    return this.usersCollection.valueChanges().pipe(first());
  }

  addNewUser(user: IUser): Promise<any> {
    return this.firestore.collection('users').add(user);
  }

  getUsers(): Observable<IUser[]> {
    return this.users;
  }
}
