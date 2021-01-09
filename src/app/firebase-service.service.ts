import { Injectable } from '@angular/core';
import {AngularFirestore , } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(public firestore: AngularFirestore) { }


  addNewUser(user): Promise<any>{
    return this.firestore.collection('users').add(user);
  }
}
