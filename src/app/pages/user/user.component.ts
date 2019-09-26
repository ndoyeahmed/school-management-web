import { Component, OnInit } from '@angular/core';
import {UtilisateurModel} from '../../modeles/utilisateur.model';
import {ProfilModel} from '../../modeles/profil.model';
import {EtablissementModel} from '../../modeles/etablissement.model';
import {VilleModel} from '../../modeles/ville.model';
import {RegionModel} from '../../modeles/region.model';
import {CompteModel} from '../../modeles/compte.model';
import {LocalisationService} from '../services/localisation.service';
import {INgxSelectOption} from 'ngx-select-ex';
import {CompteService} from '../services/compte.service';
import {EtablissementService} from '../services/etablissement.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NotificationService} from '../services/notif.service';
import {AuthenticationService} from '../../auth/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  /* list declaration */
listUser = [] as UtilisateurModel[];
listUserFilter = [] as UtilisateurModel[];
listProfil = [] as ProfilModel[];
listEtablissement = [] as EtablissementModel[];
listVille = [] as VilleModel[];
listRegion = [] as RegionModel[];
  /* END list declaration */

/* Object declaration */
  detailUser = new UtilisateurModel();
  user = new UtilisateurModel();
  userUpdate = new UtilisateurModel();
  profil = new ProfilModel();
  ville = new VilleModel();
  region = new RegionModel();
  etablissement = new EtablissementModel();
  compte = new CompteModel();
  compteUpdate = new CompteModel();
  isSuperAdmin = false;
  page = 1;
  /* END Object declaration */
  constructor(
    private localisationService: LocalisationService,
    private compteService: CompteService,
    private auth: AuthenticationService,
    private etablissementService: EtablissementService,
    private ngxService: NgxUiLoaderService,
    private notif: NotificationService,
  ) { }

  ngOnInit() {
    this.listUserFilter = null;
    this.ngxService.startLoader('list-user');
    let user = new UtilisateurModel();
    this.auth.identity().subscribe( x => {
      user = x;
      if (user.profilUtilisateurs[0].profil.nom !== 'Super Administrateur') {
        this.isSuperAdmin = true;
      }
      this.ngxService.stopLoader('list-user');
    }, error1 => {
      console.log(error1);
      this.ngxService.stopLoader('list-user');
    });
    this.ngxService.startLoader('list-user');
    this.compteService.listUser().subscribe(data => {
      this.listUser = data;
      console.log(data);
      this.ngxService.stopLoader('list-user');
    }, error1 => {
      console.log(error1);
      this.ngxService.stopLoader('list-user');
    });
  }

  onAdd() {
    this.ngxService.startLoader('add-user');
    this.localisationService.allRegion().subscribe( data => {
      this.listRegion = data;
      this.ngxService.stopLoader('add-user');
    }, error1 => {
      console.log(error1);
      this.ngxService.stopLoader('add-user');
    });
    this.ngxService.startLoader('add-user');
    this.compteService.allProfil().subscribe( data => {
      this.listProfil = data;
      this.ngxService.stopLoader('add-user');
    }, error1 => {
      console.log(error1);
      this.ngxService.stopLoader('add-user');
    });
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
    this.etablissementService.allEtablissementByVille(idVille).subscribe(
      data => this.listEtablissement = data, error1 => console.log(error1));
  }

  onSelectedProfil(event: INgxSelectOption[]) {
    const idProfil = event[0].data.id;
    this.profil = this.listProfil.filter(x => x.id === idProfil)[0];
    if (this.profil.nom === 'Super Administrateur') {
      this.isSuperAdmin = false;
      this.etablissement.id = undefined;
    } else {
      this.isSuperAdmin = true;
    }
  }

  onSelectedEtablissement(event: INgxSelectOption[]) {
    const idEtablissement = event[0].data.id;
    this.etablissement = this.listEtablissement.filter(x => x.id === idEtablissement)[0];
  }

  save() {
    if (this.etablissement.id === undefined) {
      this.etablissement.id = 0;
    }
    if (this.user.nom !== undefined && this.user.prenom !== undefined && this.user.adresse !== undefined &&
      this.user.telephone !== undefined && this.compte.email !== undefined &&
    this.profil.id !== undefined && this.ville.id !== undefined) {
      this.ngxService.startLoader('add-user');
      const values = {
        nom: this.user.nom,
        prenom: this.user.prenom,
        adresse: this.user.adresse,
        telephone: this.user.telephone,
        email: this.compte.email,
        profil: this.profil.nom,
        etablissement: this.etablissement.id + ''
      };
      this.compteService.save(values).subscribe(
        data => {
          console.log(data);
          this.clear();
          this.compteService.listUser().subscribe(u => this.listUser = u, error1 => console.log(error1));
          this.ngxService.stopLoader('add-user');
          this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
        },
        error1 => {
          console.log(error1);
          this.ngxService.stopLoader('add-user');
          this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
        }
      );
    } else {
      this.notif.error('Veuillez remplir tous les champs SVP', '', {timeOut: 6000});
    }
  }

  clear() {
    this.user = new UtilisateurModel();
    this.compte = new CompteModel();
    this.etablissement = new EtablissementModel();
    this.profil = new ProfilModel();
  }

  onClickDetail(usr) {
    this.detailUser = usr as UtilisateurModel;
  }

  search(term: string) {
    if (!term) {
     this.listUserFilter = null;
    } else {
      this.listUserFilter = this.listUser.filter(x =>
        ((x.prenom ? x.prenom.toString().toLowerCase() : '') + ' ' + (x.nom ? x.nom.toString().toLowerCase() : '')) ?
          ((x.prenom ? x.prenom.toString().toLowerCase() : '') + ' ' + (x.nom ? x.nom.toString().toLowerCase() : ''))
          .toLowerCase().includes(term.toLowerCase()) : ''
      ||  x.telephone ? x.telephone.toString().includes(term) : ''
      || x.etablissement.libelle.toLowerCase() ? x.etablissement.libelle.toLowerCase().includes(term.toLowerCase()) : '');
    }
  }

  onDesactive(usr) {
    const u = usr as UtilisateurModel;
    if (confirm('Etes vous sûr de vouloir effectuer cette opération?')) {
      this.ngxService.startLoader('list-user');
      u.etat = false;
      const values = {
        email: u.compte.email,
        etat: u.etat + '',
      };
      this.compteService.changeStatusUser(values).subscribe( x => {
        console.log(x);
        this.ngxService.startLoader('list-user');
        this.compteService.listUser().subscribe(data => {
          this.listUser = data;
          console.log(data);
          this.ngxService.stopLoader('list-user');
        }, error1 => {
          console.log(error1);
          this.ngxService.stopLoader('list-user');
        });
      }, error1 => {
        console.log(error1);
        this.ngxService.stopLoader('list-user');
      });
    } else {
      this.ngxService.startLoader('list-user');
      this.compteService.listUser().subscribe(data => {
        this.listUser = data;
        console.log(data);
        this.ngxService.stopLoader('list-user');
      }, error1 => {
        console.log(error1);
        this.ngxService.stopLoader('list-user');
      });
    }
  }

  onActive(usr) {
    const u = usr as UtilisateurModel;
    if (confirm('Etes vous sûr de vouloir effectuer cette opération?')) {
      this.ngxService.startLoader('list-user');
      u.etat = true;
      const values = {
        email: u.compte.email,
        etat: u.etat + '',
      };
      this.compteService.changeStatusUser(values).subscribe(x => {
        console.log(x);
        this.ngxService.startLoader('list-user');
        this.compteService.listUser().subscribe(data => {
          this.listUser = data;
          console.log(data);
          this.ngxService.stopLoader('list-user');
        }, error1 => {
          console.log(error1);
          this.ngxService.stopLoader('list-user');
        });
      }, error1 => {
        console.log(error1);
        this.ngxService.stopLoader('list-user');
      });
    } else {
      this.ngxService.startLoader('list-user');
      this.compteService.listUser().subscribe(data => {
        this.listUser = data;
        console.log(data);
        this.ngxService.stopLoader('list-user');
      }, error1 => {
        console.log(error1);
        this.ngxService.stopLoader('list-user');
      });
    }
  }

  onDelete(usr) {
    if (confirm('Etes vous sûr de vouloir le supprimé ?')) {
      this.ngxService.startLoader('list-user');
      const u = usr as UtilisateurModel;
      const values = {
        email: u.compte.email,
      };
      this.compteService.archiverUser(values).subscribe( x => {
        console.log(x);
        this.ngxService.startLoader('list-user');
        this.compteService.listUser().subscribe(data => {
          this.listUser = data;
          this.ngxService.stopLoader('list-user');
        }, error1 => {
          console.log(error1);
          this.ngxService.stopLoader('list-user');
        });
      }, error1 => {
        console.log(error1);
        this.ngxService.stopLoader('list-user');
      });
    }
  }

  onUpdate(usr) {
    this.ngxService.startLoader('edit-user');
    this.userUpdate = usr as UtilisateurModel;
    this.compteUpdate = usr.compte;
    this.profil = this.userUpdate.profilUtilisateurs[0].profil;
    this.compteService.allProfil().subscribe( data => {
      this.listProfil = data;
      this.ngxService.stopLoader('edit-user');
    }, error1 => {
      console.log(error1);
      this.ngxService.stopLoader('edit-user');
    });
  }

  update() {
    this.ngxService.startLoader('edit-user');
    const values = {
      email: this.compteUpdate.email,
      profil: this.profil.nom,
    };
    this.compteService.changeUserProfil(values).subscribe(
      x => {
        console.log(x);
        this.ngxService.startLoader('edit-user');
        this.compteService.listUser().subscribe(u => {
          this.listUser = u;
          this.ngxService.stopLoader('edit-user');
        }, error1 => {
          console.log(error1);
          this.ngxService.stopLoader('edit-user');
        });
        this.ngxService.stopLoader('edit-user');
        this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
      },
      error1 => {
        console.log(error1);
        this.ngxService.stopLoader('edit-user');
        this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
      }
    );
  }

}
