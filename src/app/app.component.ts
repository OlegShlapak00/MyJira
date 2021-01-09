import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public firebaseService: AuthService) {
  }

  title = 'JIRAnimoo';
  isSignIn = false;

  handleLogOut(): void {
    this.isSignIn = false;
  }

  ngOnInit(): void {
    this.isSignIn = localStorage.getItem('user') !== null;
  }
  sign(isSign: boolean): void{
    this.isSignIn = isSign;
  }
}
