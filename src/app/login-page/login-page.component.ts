import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../auth.service';
import {FirebaseServiceService} from '../firebase-service.service';
import {ISignUpForm} from '../../Models/SignUpForm';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @Output() Sign = new EventEmitter<boolean>();
  isLoginInForm = true;
  signUpForm: ISignUpForm;
  isSignIn = false;
  constructor(public firebaseService: AuthService, public firebase: FirebaseServiceService) { }

  ngOnInit(): void {
  }
  async onSignUp(data: ISignUpForm): Promise<void> {
    this.signUpForm = data;
    await this.firebaseService.signUp(this.signUpForm.email, this.signUpForm.password);

    const user = {
      userName: this.signUpForm.name,
      userSurname: this.signUpForm.surname,
      userEmail: this.signUpForm.email
    };
    await this.firebase.addNewUser(user)
      .catch(err => {
        console.log(err);
      });

    if (this.firebaseService.isLoggedIn) {
      this.isSignIn = true;
      this.Sign.emit(true);
    }
  }

  async onSignIn(data): Promise<void> {
    console.log(data);
    await this.firebaseService.signIn(data.email, data.password);
    if (this.firebaseService.isLoggedIn) {
      this.isSignIn = true;
      this.Sign.emit(true);
    }
  }
  async Google(): Promise<void> {
    await this.firebaseService.signWithGoogle();
    if (this.firebaseService.isLoggedIn) {
      this.isSignIn = true;
      this.Sign.emit(true);
    }
  }
}
