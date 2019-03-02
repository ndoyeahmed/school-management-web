import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  private api = '/api';

  constructor(private http: HttpClient) {}
  login(credentials: any): Observable<any> {
    return this.http.post(this.api + '/login', credentials);
  }
}
