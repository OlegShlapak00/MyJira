import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css', '../login-page/login-page.component.css']
})
export class SignInFormComponent implements OnInit {
  @Output() SignIn = new EventEmitter();
  email = '';
  password = '';
  constructor() { }

  ngOnInit(): void {
  }
  onSignIn(): void{
    this.SignIn.emit({email: this.email, password: this.password });
    this.email = '';
    this.password = '';
  }

}
