import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {AuthService} from './auth.service';
import {FormsModule} from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAOBA1UWmkSFS8UBjw05H1hVa1FL_to0pE',
      authDomain: 'alya-jira.firebaseapp.com',
      databaseURL: 'https://alya-jira-default-rtdb.firebaseio.com',
      projectId: 'alya-jira',
      storageBucket: 'alya-jira.appspot.com',
      messagingSenderId: '987757943786',
      appId: '1:987757943786:web:56c0031a27f8eba365f093'
    }),
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
