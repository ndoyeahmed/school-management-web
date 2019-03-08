import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cycle} from '../../modeles/cycle.model';

@Injectable()
export class ConfigurationEcoleService {
  private api = '/api';
  constructor(private http: HttpClient) {}

  saveCycle(data: Cycle): Observable<any> {
    return this.http.post(this.api + '/add-cycle', data);
  }

  all(): Observable<Cycle[]> {
    return this.http.get<Cycle[]>(this.api + '/list-cycle');
  }
}
