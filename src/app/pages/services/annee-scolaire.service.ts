import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnneeScolaire} from '../../modeles/annee-scolaire.model';
import {Observable} from 'rxjs';

@Injectable()
export class AnneeScolaireService {
  private api = '/api';
  constructor(private http: HttpClient) {}

  save(data: AnneeScolaire): Observable<any> {
    return this.http.post(this.api + '/add-annee-scolaire', data);
  }

  all(): Observable<AnneeScolaire[]> {
    return this.http.get<AnneeScolaire[]>(this.api + '/list-anne-scolaire');
  }
}
