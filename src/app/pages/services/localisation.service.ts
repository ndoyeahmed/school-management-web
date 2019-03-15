import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegionModel} from '../../modeles/region.model';
import {VilleModel} from '../../modeles/ville.model';

@Injectable()
export class LocalisationService {
  private api = '/api';
  constructor(private http: HttpClient) {}

  allRegion(): Observable<RegionModel[]> {
    return this.http.get<RegionModel[]>(this.api + '/list-regions');
  }

  allVilleByRegion(data: string): Observable<VilleModel[]> {
    return this.http.post<VilleModel[]>(this.api + '/list-villes-par-region', data);
  }
}
