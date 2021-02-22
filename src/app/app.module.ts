import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {AuthService} from './auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FirebaseServiceService} from './firebase-service.service';
import { ProjectBacklogComponent } from './project-backlog/project-backlog.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskComponent } from './task/task.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { HeaderComponent } from './header/header.component';
import { ActionMenuComponent } from './action-menu/action-menu.component';
import { FilterListPipe } from './filter-list.pipe';
import { TaskListComponent } from './task-list/task-list.component';
import { GoogleBtnComponent } from './google-btn/google-btn.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginPageComponent,
    ProjectBacklogComponent,
    AddTaskComponent,
    TaskComponent,
    SignUpFormComponent,
    SignInFormComponent,
    HeaderComponent,
    ActionMenuComponent,
    FilterListPipe,
    TaskListComponent,
    GoogleBtnComponent,
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
        DragDropModule,
        MatSelectModule,
        MatButtonToggleModule,
        ReactiveFormsModule,
        MatAutocompleteModule
    ],
  providers: [AuthService, FirebaseServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
