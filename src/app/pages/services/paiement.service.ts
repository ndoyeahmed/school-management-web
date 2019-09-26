import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MoisModel} from '../../modeles/mois.model';
import {TypePaiementModel} from '../../modeles/type-paiement.model';

@Injectable()
export class PaiementService {
  private api = '/api';

  constructor(private http: HttpClient) {}

  allMois(): Observable<MoisModel[]> {
    return this.http.get<MoisModel[]>(this.api + '/list-mois');
  }

  allTypePaiement(): Observable<TypePaiementModel[]> {
    return this.http.get<TypePaiementModel[]>(this.api + '/list-type-paiement');
  }
}
