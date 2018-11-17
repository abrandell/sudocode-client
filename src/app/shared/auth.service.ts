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

  public authenticate() {
    if (!this.authenticated) {
      this.http.get<any>('/api/auth/user').subscribe(data => {
          this.authenticated = JSON.stringify(data).includes('login');
          if (this.authenticated) {
            this.currentUser = data;
          }},
        (err: Error) => console.error(err.message)
      );
    }
  }

  public logout(): Observable<any> {
    this.currentUser = null;
    this.authenticated = false;
    return this.http.post('/api/auth/logout', {});
  }
}
