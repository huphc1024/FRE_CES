import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'CES';
  constructor() {

  }
  isLogin = false;
  ngOnInit() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
}
