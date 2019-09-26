import {Component, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NotificationService} from '../../services/notif.service';
import {ConfigurationEcoleService} from '../../services/configuration-ecole.service';
import {Cycle} from 'src/app/modeles/cycle.model';
import {INgxSelectOption} from 'ngx-select-ex';
import {NiveauModel} from '../../../modeles/niveau.model';


@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.scss']
})
export class NiveauComponent implements OnInit {

  niveau = [] as NiveauModel[];
  niveauFilter = [] as NiveauModel[];
  listeCycle = [] as Cycle[];
  niveau2 = new NiveauModel();
  cycle = new Cycle();

  updateNiveau = new NiveauModel();
  deleteNiveau = new NiveauModel();

  constructor(private notif: NotificationService,
              private configEcole: ConfigurationEcoleService,
              private ngxService: NgxUiLoaderService) {
  }

  ngOnInit() {

    this.ngxService.startLoader('niveau');
    this.configEcole.all().subscribe(data => {
      this.listeCycle = data;
    });

    this.configEcole.allNiveau().subscribe(data => {
      this.niveau = data;
    }, error1 => {
      console.log(error1);
    });
    this.ngxService.stopLoader('niveau');
    this.niveauFilter = null;
  }

  save() {
    if (this.niveau2.libelle !== undefined && this.niveau2.montantInscription !== undefined
      && this.niveau2.montantMensuel !== undefined) {

      this.ngxService.startLoader('niveau');
      this.niveau2.archiver = false;
      this.configEcole.saveNiveau(this.niveau2).subscribe(x => {
        this.configEcole.allNiveau().subscribe(data => this.niveau = data);
        this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
      }, error1 => {
        console.log(error1);
        this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
      });
      this.ngxService.stopLoader('niveau');
    } else {
      this.notif.error('Veuillez remplir tout les champs svp!', '', {timeOut: 6000});
    }
  }

  onUpdate(niveau: NiveauModel) {
    this.updateNiveau = niveau;
  }

  update() {
    if (this.niveau2.libelle !== undefined && this.niveau2.montantInscription !== undefined
      && this.niveau2.montantMensuel !== undefined) {
      this.ngxService.startLoader('niveau');
      this.configEcole.saveNiveau(this.updateNiveau).subscribe(x => {
        console.log(x);
        this.configEcole.allNiveau().subscribe(data => this.niveau = data);
        this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
      }, error1 => {
        this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
      });
      this.ngxService.stopLoader('niveau');
    } else {
      this.notif.error('Veuillez remplir tout les champs svp!', '', {timeOut: 6000});
    }

  }

  onDelete(niveau: NiveauModel) {
    this.deleteNiveau = niveau;
    if (confirm('Etes vous sûr de vouloir le supprimé ?')) {
      this.ngxService.startLoader('niveau');
      this.deleteNiveau.archiver = true;
      this.configEcole.deleteNiveau(this.deleteNiveau).subscribe(x => {
        this.configEcole.allNiveau().subscribe(data => this.niveau = data);
        this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
      }, error1 => {
        this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
      });
      this.ngxService.stopLoader('niveau');
    }
  }

  search(term: string) {
    if (!term) {
      this.niveauFilter = null;
    } else {
      this.niveauFilter = this.niveau.filter(x => (x.libelle ? x.libelle : '').toLowerCase().includes(term.toLowerCase()));
    }
  }

  onSelectedCycle(event: INgxSelectOption[]) {
    this.niveau2.cycle = event[0].data as Cycle;
  }
}
