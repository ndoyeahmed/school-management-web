import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {PagesRoutingModule} from './pages-routing.module';
import { AnneeScolaireComponent } from './annee-scolaire/annee-scolaire.component';
import { AddComponent } from './annee-scolaire/add/add.component';
import { ListComponent } from './annee-scolaire/list/list.component';
import {MatButtonModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {AnneeScolaireService} from './services/annee-scolaire.service';
import {NotificationService} from './services/notif.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';

@NgModule({
  declarations: [DashboardComponent, AnneeScolaireComponent, AddComponent, ListComponent],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AnneeScolaireService,
    NotificationService,
  ]
})
export class PagesModule { }
