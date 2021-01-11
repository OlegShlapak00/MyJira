import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private afs: AngularFirestore) { }
  ngOnInit(): void {
  }
  updateTask(): void {
  this.afs.doc(`Tasks/${this.data.id}`)
    .update({
        taskAssignee: this.data.assignee,
        taskDescription: this.data.description,
        taskName: this.data.name,
        taskStan: this.data.stan
    });
  }

}
