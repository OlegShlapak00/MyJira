import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../auth.service';
import {FirebaseServiceService} from '../firebase-service.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @Output() Sign = new EventEmitter<boolean>();
  myForm: FormGroup;
  isSignIn = false;
  emailSignUp = '';
  passwordSignUp = '';
  email = '';
  password = '';
  userName = '';
  userSurname = '';
  constructor(public firebaseService: AuthService, public firebase: FirebaseServiceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      formEmail: (['', Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required)
    });

  }
  isValid(): boolean {
    return this.myForm.status !== 'VALID';
  }
  async onSignUp(): Promise<void> {
    this.emailSignUp = this.myForm.controls.formEmail.value;
    this.passwordSignUp = this.myForm.controls.password.value;
    this.userName = this.myForm.controls.name.value;
    this.userSurname = this.myForm.controls.surname.value;
    await this.firebaseService.signUp(this.emailSignUp, this.passwordSignUp);
    const user = {
      userName: this.userName,
      userSurname: this.userSurname,
      userEmail: this.emailSignUp
    };
    await this.firebase.addNewUser(user)
      .then(() => {
        this.emailSignUp = '';
        this.passwordSignUp = '';
        this.password = '';
        this.email = '';
      })
      .catch(err => {
        console.log(err);
      });

    if (this.firebaseService.isLoggedIn) {
      this.isSignIn = true;
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
