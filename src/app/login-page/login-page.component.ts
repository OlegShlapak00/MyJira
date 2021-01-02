import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @Output() Sign = new EventEmitter<boolean>();
  isSignIn = false;
  emailSignUp = '';
  passwordSignUp = '';
  email = '';
  password = '';
  constructor(public firebaseService: AuthService ) { }

  ngOnInit(): void {
  }

  async onSignUp(): Promise<void> {
    await this.firebaseService.signUp(this.emailSignUp, this.passwordSignUp);
    if (this.firebaseService.isLoggedIn) {
      this.isSignIn = true;
      this.emailSignUp = '';
      this.passwordSignUp = '';
      this.password = '';
      this.email = '';
      this.Sign.emit(true);
    }
  }

  async onSignIn(): Promise<void> {
    await this.firebaseService.signIn(this.email, this.password);
    if (this.firebaseService.isLoggedIn) {
      this.isSignIn = true;
      this.emailSignUp = '';
      this.passwordSignUp = '';
      this.password = '';
      this.email = '';
      this.Sign.emit(true);
    }
  }
}
