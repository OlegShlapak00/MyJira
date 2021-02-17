import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {IUser} from '../../Models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() user: IUser;
  @Output() Click = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  logOut(): void{
    this.Click.emit();
  }

}
