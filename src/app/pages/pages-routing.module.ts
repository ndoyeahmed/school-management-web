import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../auth/auth-guard.service';
import {AnneeScolaireComponent} from './annee-scolaire/annee-scolaire.component';
import {CycleComponent} from './configuration-ecole/cycle/cycle.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], component: DashboardComponent },
  {path: 'annee-scolaire', canActivate: [AuthGuard], component: AnneeScolaireComponent},
  {path: 'cycle', canActivate: [AuthGuard], component: CycleComponent},
  {path: 'user', canActivate: [AuthGuard], component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
