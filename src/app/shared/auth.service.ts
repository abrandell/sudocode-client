import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from './IUser';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticated = false;
  public currentUser: IUser;

  constructor(private http: HttpClient) {
  }

  public authenticate(callback) {
    this.http.get<any>('/api/users/me')
      .subscribe(data => {
        this.authenticated = JSON.stringify(data).includes('login');

        if (this.authenticated) {
          this.currentUser = data;
        }

        return callback && callback();
      });

  }

  public logout(): void {
    this.currentUser = null;
    this.authenticated = false;
  }
}
