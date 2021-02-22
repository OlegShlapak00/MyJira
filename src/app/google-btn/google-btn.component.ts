import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-google-btn',
  templateUrl: './google-btn.component.html',
  styleUrls: ['./google-btn.component.scss']
})
export class GoogleBtnComponent implements OnInit {
  @Output() clicked = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  OnClick(): void {
    this.clicked.emit();
  }

}
