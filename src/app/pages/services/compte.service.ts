import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProfilModel} from '../../modeles/profil.model';
import {UtilisateurModel} from '../../modeles/utilisateur.model';

@Injectable()
export class CompteService {
  private api = '/api';
  constructor(private http: HttpClient) {}

  allProfil(): Observable<ProfilModel[]> {
    return this.http.get<ProfilModel[]>(this.api + '/liste-profils');
  }

  listUser(): Observable<UtilisateurModel[]> {
    return this.http.get<UtilisateurModel[]>(this.api + '/liste-utilisateurs');
  }

  save(data: any): Observable<any> {
    return this.http.post<any>(this.api + '/ajouter-utilisateur', data);
  }

  changeStatusUser(data: any): Observable<any> {
    return this.http.post<any>(this.api + '/change-status-user', data);
  }

  archiverUser(data: any): Observable<any> {
    return this.http.post<any>(this.api + '/archiver-user', data);
  }
}
