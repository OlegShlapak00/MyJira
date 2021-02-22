import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ISignUpForm} from '../../Models/SignUpForm';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css', '../login-page/login-page.component.css']
})
export class SignUpFormComponent implements OnInit {

  @Output() SignUp = new EventEmitter<ISignUpForm>();
  formData: ISignUpForm = {email: '', name: '', password: '', surname: ''} ;
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {  }      // fb ?

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
  onSignUp(): void{
    this.formData.email = this.myForm.controls.formEmail.value;
    this.formData.name = this.myForm.controls.name.value;
    this.formData.password = this.myForm.controls.password.value;
    this.formData.surname = this.myForm.controls.surname.value;
    this.SignUp.emit(this.formData);
    this.formData = null;
  }

}
