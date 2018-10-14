import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from './IUser';
import {UserPage} from './user-page';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = '/api/users';

  constructor(private http: HttpClient) {
  }

  public fetchById(id: number): Observable<IUser> {
    return this.http.get<IUser>(
      `${this.URL}/${id}`
    );
  }

  public fetchAll(page: number, sortOrder: string): Observable<UserPage> {
    return this.http.get<UserPage>(
      `${this.URL}?page=${page}&sort=${sortOrder}`
    );
  }

}
