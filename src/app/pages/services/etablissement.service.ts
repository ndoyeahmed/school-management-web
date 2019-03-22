import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EtablissementModel} from '../../modeles/etablissement.model';

@Injectable()
export class EtablissementService {
  private api = '/api';
  constructor(private http: HttpClient) {}

  allEtablissementByVille(data: string): Observable<EtablissementModel[]> {
    return this.http.post<EtablissementModel[]>(this.api + '/list-etablissements', data);
  }
}
