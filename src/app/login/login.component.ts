import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) { }
  loginLayout: any;
  ngOnInit() {
    this.loginService.getLogin().subscribe( res => {
      this.loginLayout = res;
    });
  }

}
