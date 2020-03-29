import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private route: Router
  ) {
  }

  loginLayout: any;
  username;
  password;
  messageValid = 'Username hoặc mật khẩu sai';
  valid = false;

  ngOnInit() {

  }

  login() {
    this.loginService.login(this.username, this.password).subscribe(res => {
      localStorage.setItem('user', JSON.stringify(res));
      this.route.navigate(['']);
    }, error => {
      this.valid = true;
    });
  }

}
