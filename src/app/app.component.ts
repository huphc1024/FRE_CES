import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'CES';
  constructor( private route: Router) {

  }
  isLogin = false;
  ngOnInit() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.isLogin = true;
      this.route.navigate(['/login']);
    } else {
      this.isLogin = false;
    }
  }
}
