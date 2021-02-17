import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.css']
})
export class ActionMenuComponent implements OnInit {
  @Output() my = new EventEmitter();
  @Output() all = new EventEmitter();
  @Output() addTask = new EventEmitter();
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
}
