import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
authStatus: boolean;
  progressbar: boolean;
  showPassword; boolean;
  credentials = {
    login: '',
    password: '',
    rememberMe: false
  };
  error = false;
  constructor(
    private loginService: AuthService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.showPassword = false;
    this.progressbar = false;
  }

  login() {
    this.progressbar = true;
    this.loginService.login(this.credentials).subscribe(resp => {
      this.authService.login(resp.id_token);
      this.error = false;
    }, error => {
      console.log(error);
      this.error = true;
      this.progressbar = false;
    });
  }
}
