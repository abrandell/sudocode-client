import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, public auth: AuthService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.auth.authenticate(undefined);
    });
  }

  logout(): void {
    this.auth.logout()
      .subscribe(
        status => console.log(status),
        err => console.log(err)
      );
  }

}
