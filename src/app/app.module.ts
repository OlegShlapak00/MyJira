import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {AuthService} from './auth.service';
import {FormsModule} from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FirebaseServiceService} from './firebase-service.service';
import { ProjectBacklogComponent } from './project-backlog/project-backlog.component';
import { AddTaskComponent } from './add-task/add-task.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginPageComponent,
    ProjectBacklogComponent,
    AddTaskComponent,
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
    FormsModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    DragDropModule
  ],
  providers: [AuthService, FirebaseServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
