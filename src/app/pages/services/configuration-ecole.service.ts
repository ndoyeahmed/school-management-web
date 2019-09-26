import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cycle} from '../../modeles/cycle.model';
import {NiveauModel} from '../../modeles/niveau.model';
import {ClasseModel} from '../../modeles/classe.model';


@Injectable()
export class ConfigurationEcoleService {
  private api = '/api';

  constructor(private http: HttpClient) {
  }

  // ...........Gestion des Niveaux.................
  saveNiveau(data: NiveauModel): Observable<any> {
    return this.http.post(this.api + '/add-niveau', data);
  }

  deleteNiveau(data: NiveauModel): Observable<any> {
    return this.http.post(this.api + '/delete-niveau', data);
  }

  // ---------------fin Gestion des niveau--------------------
  all(): Observable<Cycle[]> {
    return this.http.get<Cycle[]>(this.api + '/list-cycle');
  }

  deleteCycle(data: Cycle): Observable<any> {
    return this.http.post(this.api + '/delete-cycle', data);
  }

  saveCycle(data: Cycle): Observable<any> {
    return this.http.post(this.api + '/add-cycle', data);
  }

  allNiveau(): Observable<NiveauModel[]> {
    return this.http.get<NiveauModel[]>(this.api + '/list-niveau');
  }

  allClasse(): Observable<ClasseModel[]> {
    return this.http.get<ClasseModel[]>(this.api + '/list-classe');
  }
}
