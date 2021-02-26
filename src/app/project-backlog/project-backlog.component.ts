import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddTaskComponent} from '../add-task/add-task.component';

import {TaskComponent} from '../task/task.component';
import {IUser} from '../../Models/User';
import {TasksSrviceService} from '../tasks-srvice.service';
import {FirebaseServiceService} from '../firebase-service.service';

@Component({
  selector: 'app-project-backlog',
  templateUrl: './project-backlog.component.html',
  styleUrls: ['./project-backlog.component.css']
})

export class ProjectBacklogComponent implements OnInit {
  @Input() user: IUser;
  TaskList;
  UserList;
  currProject = 'Default';
  projects = ['MyProject', 'Second Project', 'Another Proj'];
  constructor(
    public dialog: MatDialog,
    public taskService: TasksSrviceService,
    public userService: FirebaseServiceService
    ) {
  }

  openDialog(): void {
    this.dialog.open(AddTaskComponent,
      {
        data: {
          project: this.currProject
        }
      });
  }
  openTask(data): void {
    this.dialog.open(TaskComponent,
      {
        data: {
          id: data.taskId,
          name: data.taskName,
          description: data.taskDescription,
          assignee: data.taskAssignee,
          stan: data.taskStan,
        }
      });
  }

  ngOnInit(): void {
    this.taskService.getTasks(this.currProject).subscribe(tasks => {
      this.TaskList = tasks;
    });
  }
  updateTask(data): void{
    this.taskService.updateTaskStan(data.taskId, data.newState);
  }
  myTask(): void {
    this.TaskList = this.TaskList
      .filter(task => task.taskAssignee === `${this.user.userName} ${this.user.userSurname}`);
  }
  allTask(): void {
    this.taskService.getTasks(this.currProject).subscribe(tasks => {
      this.TaskList = tasks;
    });
  }
  updateCurrentProject(project): void{
    this.currProject = project;
    this.taskService.getTasks(this.currProject).subscribe(tasks => {
      this.TaskList = tasks;
    });
  }
}



