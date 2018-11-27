import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {LoginUrl} from '../shared/login-url.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  collapsed = true;

  constructor(public auth: AuthService) {}

  login() {
    window.location.href = LoginUrl.HEROKU;
  }

  ngOnInit(): void {
    this.auth.authenticate();
  }

  logout(): void {
    this.auth.logout()
        .subscribe(
          status => console.log(status),
          err => console.log(err)
        );
  }

  ngOnDestroy(): void {}

}
