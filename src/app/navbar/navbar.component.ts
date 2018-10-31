import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private destroy = new Subject();
  collapsed = true;

  constructor(private activatedRoute: ActivatedRoute, private route: Router, public auth: AuthService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy))
      .subscribe((params: Params) => {
      console.log(params);
      this.auth.authenticate();
    });
  }

  logout(): void {
    this.auth.logout()
      .subscribe(
        status => console.log(status),
        err => console.log(err)
      );
  }

  login() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete()
  }

}
