import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cycle} from '../../modeles/cycle.model';
import {Niveau} from 'src/app/modeles/niveau.model';


@Injectable()
export class ConfigurationEcoleService {
  private api = '/api';
  constructor(private http: HttpClient) {}
  //...........Gestion des Niveaux.................
  saveNiveau(data: Niveau): Observable<any> {
    return this.http.post(this.api+ '/add-niveau', data);
  }

  allNiveau():Observable<Niveau[]> {
    return this.http.get<Niveau[]>(this.api+ '/list-niveau');
  }

  deleteNiveau(data: Niveau): Observable<any> {
    return this.http.post(this.api+ '/delete-niveau', data);
  }
  //---------------fin Gestion des niveau--------------------
  all():Observable<Cycle[]> {
    return this.http.get<Cycle[]>(this.api+ '/list-cycle');
  }
  deleteCycle(data: Cycle): Observable<any> {
    return this.http.post(this.api+ '/delete-cycle', data);
  }
  saveCycle(data: Cycle): Observable<any> {
    return this.http.post(this.api+ '/add-cycle', data);
  }
}
