import { NgModule } from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import {MainContentComponent} from './layout/main-content/main-content.component';

const routes: Routes = [
  {path: '', redirectTo: 'pages', pathMatch: 'full'},
  {path: '', component: MainContentComponent, children: [{path: 'pages', loadChildren: './pages/pages.module#PagesModule'}]}
];

const config: ExtraOptions = {useHash: true};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
