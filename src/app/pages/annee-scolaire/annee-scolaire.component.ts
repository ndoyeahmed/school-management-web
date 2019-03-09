import { Component, OnInit } from '@angular/core';
import {AnneeScolaire} from '../../modeles/annee-scolaire.model';
import {AnneeScolaireService} from '../services/annee-scolaire.service';
import {NotificationService} from '../services/notif.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';


@Component({
  selector: 'app-annee-scolaire',
  templateUrl: './annee-scolaire.component.html',
  styleUrls: ['./annee-scolaire.component.scss'],
})
export class AnneeScolaireComponent implements OnInit {
  anneeScolaires = [] as AnneeScolaire[];
  anneeScolairesFilter = [] as AnneeScolaire[];
  updateAnneeScolaire = new AnneeScolaire();
  deleteAnneeScolaire = new AnneeScolaire();
  anneeScolaire = new AnneeScolaire();

  constructor(private anneeScolaireService: AnneeScolaireService,
              private notif: NotificationService,
              private ngxService: NgxUiLoaderService) {
  }

  ngOnInit() {
    this.ngxService.startLoader('liste-annee');
    this.anneeScolaireService.all().subscribe(data => {
      this.anneeScolaires = data;
      this.ngxService.stopLoader('liste-annee');
    }, error1 => {
      this.ngxService.stopLoader('liste-annee');
    });
    this.anneeScolairesFilter = null;
  }

  save() {
    // this.ngxService.startLoader('add-annee');
    this.ngxService.startLoader('liste-annee');
    this.anneeScolaire.encours = false;
    this.anneeScolaire.archiver = false;
    this.anneeScolaireService.save(this.anneeScolaire).subscribe( data => {
      console.log(data);
      this.anneeScolaireService.all().subscribe(x => {
        this.anneeScolaires = x;
      });
      this.anneeScolaire = new AnneeScolaire();
      this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
    }, error1 => {
      console.log(error1);
      this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
    });
    this.ngxService.stopLoader('liste-annee');
    // this.ngxService.stopLoader('add-annee');
  }

  onActive(anneeScolaire) {
    this.ngxService.startLoader('liste-annee');
    const ans = anneeScolaire as AnneeScolaire;
    ans.encours = true;
    this.anneeScolaireService.save(ans).subscribe(data => {
      console.log(data);
      this.anneeScolaireService.all().subscribe(data1 => {
        this.anneeScolaires = data1;
      });
      this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
    }, error1 => {
      console.log(error1);
      this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
    });
    this.ngxService.stopLoader('liste-annee');
  }

  onDesactive(anneeScolaire) {
    this.ngxService.startLoader('liste-annee');
    const ans = anneeScolaire as AnneeScolaire;
    ans.encours = false;
    this.anneeScolaireService.save(ans).subscribe(data => {
      console.log(data);
      this.anneeScolaireService.all().subscribe(data1 => {
        this.anneeScolaires = data1;
      });
      this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
    }, error1 => {
      console.log(error1);
      this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
    });
    this.ngxService.stopLoader('liste-annee');
  }

  search(term: string) {
    if (!term) {
      this.anneeScolairesFilter = null;
    } else {
      this.anneeScolairesFilter = this.anneeScolaires.filter(x =>
        (x.annee ? x.annee : '').toLowerCase().includes(term.toLowerCase()) ||
        (x.encours ? 'Année en cours' : 'non actif').toLocaleLowerCase().includes(term.toLowerCase())
      );
    }
  }

  onUpdate(annee: AnneeScolaire) {
    this.updateAnneeScolaire = annee;
  }

  onDelete(annee: AnneeScolaire) {
    this.deleteAnneeScolaire = annee;
    if (confirm('Etes vous sûr de vouloir le supprimé ?')) {
      this.ngxService.startLoader('liste-annee');
      this.deleteAnneeScolaire.archiver = true;
      this.anneeScolaireService.save(this.deleteAnneeScolaire).subscribe( x => {
        console.log(x);
        this.anneeScolaireService.all().subscribe(data => {
          this.anneeScolaires = data;
          this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
        });
      }, error1 => {
        console.log(error1);
        this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
      });
      this.ngxService.stopLoader('liste-annee');
    }
  }

  update() {
    this.ngxService.startLoader('liste-annee');
    this.anneeScolaireService.save(this.updateAnneeScolaire).subscribe(x => {
      console.log(x);
      this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
    }, error1 => {
      console.log(error1);
      this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
    });
    this.ngxService.stopLoader('liste-annee');
  }
}


