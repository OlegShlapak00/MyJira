import {Component, EventEmitter, OnInit, Output, NgModule} from '@angular/core';
import {AuthService} from '../auth.service';
import {IUser} from '../../Models/User';

import {CommonModule} from '@angular/common';
import {FirebaseServiceService} from '../firebase-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @NgModule({
    imports: [CommonModule]
  })
  @Output() isLogout = new EventEmitter<void>();

  constructor(public firebaseService: AuthService, public userService: FirebaseServiceService) {
  }
  userNS: IUser = {userEmail: '', userName: '', userSurname: ''};

  ngOnInit(): void {
    this.userService.getCurrUser().subscribe(
      user => {
        this.userNS = user[0];
      }
    );
  }

  logOut(): void {
    this.firebaseService.logout();
    this.isLogout.emit();
  }
}
