import { Component, OnInit } from '@angular/core';
import {UtilisateurModel} from '../../modeles/utilisateur.model';
import {ProfilModel} from '../../modeles/profil.model';
import {EtablissementModel} from '../../modeles/etablissement.model';
import {VilleModel} from '../../modeles/ville.model';
import {RegionModel} from '../../modeles/region.model';
import {CompteModel} from '../../modeles/compte.model';
import {LocalisationService} from '../services/localisation.service';
import {INgxSelectOption} from 'ngx-select-ex';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  /* list declaration */
listUser = [] as UtilisateurModel[];
listProfil = [] as ProfilModel[];
listEtablissement = [] as EtablissementModel[];
listVille = [] as VilleModel[];
listRegion = [] as RegionModel[];
  /* END list declaration */

/* Object declaration */
  user = new UtilisateurModel();
  profil = new ProfilModel();
  ville = new VilleModel();
  region = new RegionModel();
  etablissement = new EtablissementModel();
  compte = new CompteModel();
  /* END Object declaration */
  constructor(private localisationService: LocalisationService) { }

  ngOnInit() {
    this.localisationService.allRegion().subscribe( data => this.listRegion = data, error1 => console.log(error1));
  }

  onSelectedRegion(event: INgxSelectOption[]) {
    console.log(event[0].data.id);
    const idRegion = event[0].data.id;
    this.region = this.listRegion.filter( x => x.id === idRegion)[0];
    console.log(this.region);
    this.localisationService.allVilleByRegion(idRegion + '').subscribe(data => this.listVille = data, error1 => console.log(error1));
  }

  onSelectedVille(event: INgxSelectOption[]) {
    console.log(event[0].data.id);
    const idVille = event[0].data.id;
    this.ville = this.listVille.filter(x => x.id === idVille)[0];
    console.log(this.ville);
  }

}
