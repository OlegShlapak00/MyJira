import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.css']
})
export class ActionMenuComponent implements OnInit {
  @Input() projects: string[];
  @Output() my = new EventEmitter();
  @Output() all = new EventEmitter();
  @Output() addTask = new EventEmitter();
  @Output() project = new EventEmitter();

  currentProj = 'Default';
  constructor() { }

  ngOnInit(): void {
  }
  addNewTask(): void {
    this.addTask.emit();
  }
  myTask(): void {
    this.my.emit();
  }
  allTask(): void {
    this.all.emit();
  }
  changeProj(): void {
    this.project.emit(this.currentProj);
  }
}
