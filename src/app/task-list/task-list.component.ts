import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ITask} from '../../Models/Task';
import {TaskComponent} from '../task/task.component';
import {MatDialog} from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() listName: string;
  @Input() listData: ITask[];
  @Input() connectedLists: string[];
  @Output() updateTask = new EventEmitter();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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
  drop(event: CdkDragDrop<ITask[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      const dragItem: any = event.container.data[event.currentIndex];
      const id = event.container.element.nativeElement.id;
      switch (id){
        case 'todo': {
          this.updateTask.emit({taskId: dragItem.taskId, newState: 'OPEN'});
          break;
        }
        case 'progress': {
          this.updateTask.emit({taskId: dragItem.taskId, newState: 'PROGRESS'});
          break;
        }
        case 'done': {
          this.updateTask.emit({taskId: dragItem.taskId, newState: 'DONE'});
          break;
        }
      }
    }
  }
}
