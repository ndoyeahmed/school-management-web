import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {PagesRoutingModule} from './pages-routing.module';
import { AnneeScolaireComponent } from './annee-scolaire/annee-scolaire.component';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatDialog,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {AnneeScolaireService} from './services/annee-scolaire.service';
import {NotificationService} from './services/notif.service';
import { ConfigurationEcoleComponent } from './configuration-ecole/configuration-ecole.component';
import { ClassesComponent } from './configuration-ecole/classes/classes.component';
import {CycleComponent} from './configuration-ecole/cycle/cycle.component';
import {NiveauComponent} from './configuration-ecole/niveau/niveau.component';
import {NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER} from 'ngx-ui-loader';
import {ConfigurationEcoleService} from './services/configuration-ecole.service';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 30,
  bgsType: SPINNER.chasingDots,
  fgsType: SPINNER.chasingDots,
  fgsPosition: POSITION.centerCenter,
  fgsSize: 30,
  fgsColor: 'red',
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
};

@NgModule({
 declarations: [DashboardComponent, AnneeScolaireComponent, CycleComponent, NiveauComponent, ConfigurationEcoleComponent, ClassesComponent],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [
    AnneeScolaireService,
    NotificationService,
    ConfigurationEcoleService,
  ]
})
export class PagesModule { }
