import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthenticationService {
  private api = '/api';

  constructor(private cookie: CookieService, private router: Router, private http: HttpClient) {}

  login(token: string): void {
    this.cookie.set('mdd_token', token);
    this.identity().subscribe(user => {
      this.cookie.set('user_data', JSON.stringify(user));
      if (this.hasAnyAuthority(['Super Administrateur'], user)) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['/pages/map']);
      }
    });
  }

  isAuthenticated(): boolean { return this.cookie.get('mdd_token') !== null && this.cookie.get('mdd_token').length !== 0; }

  identity(): Observable<any> {
    if (this.cookie.get('user_data') !== null && this.cookie.get('user_data').length !== 0) {
      return of(JSON.parse(this.cookie.get('user_data')));
    } else {
      return this.http.get<any>(this.api + '/utilisateur-connecte');
    }
  }

  token(key: string): string { return this.cookie.get(key); }

  logout() {
    this.cookie.delete('mdd_token');
    this.cookie.delete('user_data');
    this.router.navigate(['/login']);
  }

  hasAnyAuthority(authorities: string[], user: any ): boolean {
    for (let i = 0; i < authorities.length; i++) {
      for (let j = 0; j < user.profilUtilisateurs.length; j++) {
        if (user.profilUtilisateurs[j].profil.nom === authorities[i]) {
          return true;
        }
      }
    }
    return false;
  }
}
