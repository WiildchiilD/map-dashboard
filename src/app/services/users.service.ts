import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {
  private usersList: any;

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  getUserneme(id: string) {
    return this.http.get<string>(`${environment.apiUrl}api/users/${id}`);

  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/api/user/register`, user);
  }

  update(id: string, user: User) {
    return this.http.put(`${environment.apiUrl}/api/user/${id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }

}
