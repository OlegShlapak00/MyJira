import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import auth = firebase.auth;
import {IUser} from '../Models/User';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(public firebaseAuth: AngularFireAuth,
              public firestore: AngularFirestore) {
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  async signWithGoogle(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.firebaseAuth.signInWithPopup(provider);
    const name = credentials.user.displayName.split(' ');
    const user: IUser = {
      userEmail: credentials.user.email,
      userName: name[0],
      userSurname: name[1]
    };
    this.isLoggedIn = true;
    localStorage.setItem('user', JSON.stringify({email: user.userEmail}));
    const tmpUser = this.firestore.collection('users', ref => {
      return ref.where('userEmail', '==', user.userEmail);
    }).valueChanges();
    await tmpUser.subscribe(users => {
      if (users.length === 0){
          this.firestore.collection('users').add(user);
      }
    });
  }

  async signUp(email: string, password: string): Promise<void> {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  logout(): void {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  getUserEmail(): string {
    return JSON.parse(localStorage.getItem('user')).email;
  }
}
