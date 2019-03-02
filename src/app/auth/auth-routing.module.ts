import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: 'login', component: LoginComponent}
];

const config: ExtraOptions = {useHash: true};

@NgModule({
imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
