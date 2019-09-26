import { Component, OnInit } from '@angular/core';
import {PaiementService} from '../services/paiement.service';
import {MoisModel} from '../../modeles/mois.model';
import {TypePaiementModel} from '../../modeles/type-paiement.model';
import {EleveModel} from '../../modeles/eleve.model';
import {ParentModel} from '../../modeles/parent.model';
import {Cycle} from '../../modeles/cycle.model';
import {PaiementModel} from '../../modeles/paiement.model';
import {NiveauModel} from '../../modeles/niveau.model';
import {ClasseModel} from '../../modeles/classe.model';
import {ConfigurationEcoleService} from '../services/configuration-ecole.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

/**
 * @author Mouhamed NDOYE
 */

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  name = 'Angular 4';
  url = '';
  /*------------ Simple Objects ----------------------*/
  eleve = new EleveModel();
  parent = new ParentModel();
  cycle = new Cycle();
  typePaiement = new TypePaiementModel();
  paiement = new PaiementModel();
  mois = new MoisModel();
  niveau = new NiveauModel();
  classe = new ClasseModel();
  montantInscriptionApayer = 0;
  /*------------ End Simple Objects ----------------------*/

  /*------------ List ----------------------*/
  listEleve = [] as EleveModel[];
  listParent = [] as ParentModel[];
  listCycle = [] as Cycle[];
  listClasse = [] as ClasseModel[];
  listClasseFiltered = [] as ClasseModel[];
  listNiveauFiltered = [] as NiveauModel[];
  listNiveau = [] as NiveauModel[];
  listMois = [] as MoisModel[];
  listTypePaiement = [] as TypePaiementModel[];
  /*------------ end List ----------------------*/

  constructor(
    private paiementService: PaiementService,
    private configSchoolService: ConfigurationEcoleService,
  ) { }

  ngOnInit() {
    this.paiementService.allMois().subscribe(data => {
      this.listMois = data;
    }, error1 => {
      console.log(error1);
    });
    this.paiementService.allTypePaiement().subscribe(data => {
      this.listTypePaiement = data;
    }, error1 => {
      console.log(error1);
    });
    this.configSchoolService.all().subscribe(data => {
      this.listCycle = data;
    }, error1 => {
      console.log(error1);
    });
    this.configSchoolService.allNiveau().subscribe(data => {
      this.listNiveau = data;
    }, error1 => {
      console.log(error1);
    });
    this.configSchoolService.allClasse().subscribe(data => {
      this.listClasse = data;
    }, error1 => {
      console.log(error1);
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event1: any) => { // called once readAsDataURL is completed
        this.url = event1.target.result;
      };
    }
  }
  public delete() {
    this.url = null;
  }

  onSelectedCycle() {
     this.listNiveauFiltered = this.listNiveau.filter( x =>
     x.cycle.id === this.cycle.id);
  }
  onSelectedNiveau() {
     this.listClasseFiltered = this.listClasse.filter( x =>
     x.niveau.id === this.niveau.id);
     this.niveau = this.listNiveauFiltered.filter(x => x.id === this.niveau.id)[0];
     this.montantInscriptionApayer = this.niveau.montantInscription;
     console.log(this.niveau.montantInscription);
     console.log(this.niveau.id);
  }

  onChangeGenre() {
    console.log(this.parent.jeSuis);
  }

  /**
   * methode permettant de faire l'inscription
   */
  inscription() {
    if (this.eleve !== undefined && this.eleve !== null) {
      if (this.parent !== undefined && this.parent !== null) {
        if (this.classe !== undefined && this.classe !== null) {
          if (this.paiement !== undefined && this.paiement != null && this.typePaiement !== undefined && this.typePaiement != null) {
            console.log(this.eleve);
            console.log(this.parent);
            console.log(this.classe);
          } else {

          }
        }
      } else {
      }
    } else {
    }
  }
}
