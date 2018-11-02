import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  protected collapsed = true;
  private destroy = new Subject();

  constructor(private activatedRoute: ActivatedRoute, public auth: AuthService) {
  }

  login() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
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

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete()
  }

}
