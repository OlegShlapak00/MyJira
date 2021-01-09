import {Component, EventEmitter, OnInit, Output, NgModule} from '@angular/core';
import {AuthService} from '../auth.service';
import {IUser} from '../../Models/User';
import {AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @NgModule({
    imports: [ CommonModule ]
  })
  @Output() isLogout = new EventEmitter< void >();
  constructor(public firebaseService: AuthService, private afs: AngularFirestore) { }
  usersCollection: AngularFirestoreCollection<IUser>;
  users: Observable<IUser[]>;
  ngOnInit(): void {
    this.usersCollection = this.afs.collection('users', ref => {
      return ref.where('userEmail', '==', this.firebaseService.getUserEmail()).limit(1);
    });
    this.users = this.usersCollection.valueChanges();
  }
  logOut(): void{
    this.firebaseService.logout();
    this.isLogout.emit();
  }
}
