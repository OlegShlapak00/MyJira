import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output() isLogout = new EventEmitter< void >();
  constructor(public firebaseService: AuthService) { }

  ngOnInit(): void {
  }
  logOut(): void{
    this.firebaseService.logout();
    this.isLogout.emit();
  }
}
