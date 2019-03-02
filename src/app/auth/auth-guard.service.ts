import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {CookieService} from 'ngx-cookie-service';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private cookie: CookieService, private router: Router, private auth: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const authorities: string[] = route.data['authorities'];
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return (!authorities || authorities.length === 0) ? true : this.checkProfil(authorities);
    }
  }

  checkProfil(authorities: string[]): Promise<boolean> {
    return Promise.resolve(this.auth.identity().toPromise().then((user) => {
      if (user && this.auth.hasAnyAuthority(authorities, user)) {
        return true;
      }
      this.router.navigate(['/pages/map']);
      return false;
    }));
  }
}
