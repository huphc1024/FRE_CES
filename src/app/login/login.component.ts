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
    const  user = localStorage.getItem('user');
    if(user) {
      this.route.navigate(['']);
    }
  }

  login() {
    this.loginService.login(this.username, this.password).subscribe(res => {
      localStorage.setItem('user', JSON.stringify(res));
      window.location.reload();
    }, error => {
      this.valid = true;
    });
  }

}
