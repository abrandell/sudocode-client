import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  collapsed = true;

  constructor(public auth: AuthService) {}

  login() {
    window.location.href = 'https://sudocode-app.herokuapp.com/oauth2/authorization/github';
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
