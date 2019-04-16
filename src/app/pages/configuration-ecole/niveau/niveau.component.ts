import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NotificationService} from '../../services/notif.service';
import {ConfigurationEcoleService} from '../../services/configuration-ecole.service';
import {Niveau} from '../../../modeles/niveau.model';
import {Cycle} from 'src/app/modeles/cycle.model';



@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.scss']
})
export class NiveauComponent implements OnInit {


  listNiveau = [] as Niveau[];
  listNiveauFilter = [] as Niveau[];
  niveau = new Niveau();
  cycle = new Cycle();

  updateNiveau = new Niveau();
  deleteNiveau = new Niveau();

  constructor( private notif: NotificationService,
    private configEcole: ConfigurationEcoleService,
    private ngxService: NgxUiLoaderService) {}

  ngOnInit() {
    this.ngxService.startLoader('niveau');
    this.configEcole.allNiveau().subscribe( data => {
      this.listNiveau = data;
    }, error1 => {
      console.log(error1);
    });
    this.ngxService.stopLoader('niveau');
    this.listNiveauFilter = null;
  }

  save() {
    this.ngxService.startLoader('niveau');
    this.niveau.archiver = false;
    this.configEcole.saveNiveau(this.niveau).subscribe( x => {
      this.configEcole.allNiveau().subscribe( data => this.listNiveau = data);
      this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
    }, error1 => {
      console.log(error1);
      this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
    });
    this.ngxService.stopLoader('niveau');
  }

  onUpdate(niveau: Niveau) {
    this.updateNiveau = niveau;
  }
  update() {
    this.ngxService.startLoader('niveau');
    this.configEcole.saveNiveau(this.updateNiveau).subscribe( x => {
      console.log(x);
      this.configEcole.allNiveau().subscribe( data => this.listNiveau = data);
      this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
    }, error1 => {
      this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
    });
    this.ngxService.stopLoader('niveau');
  }

  onDelete(niveau: Niveau) {
    this.deleteNiveau = niveau;
    if (confirm('Etes vous sûr de vouloir le supprimé ?')) {
      this.ngxService.startLoader('niveau');
      this.deleteNiveau.archiver = true;
      this.configEcole.deleteNiveau(this.deleteNiveau).subscribe(x => {
        this.configEcole.allNiveau().subscribe( data => this.listNiveau = data);
        this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
      }, error1 => {
        this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
      });
      this.ngxService.stopLoader('niveau');
    }
  }

  search(term: string) {
    if (!term) {
      this.listNiveauFilter = null;
    } else {
      this.listNiveauFilter = this.listNiveau.filter(x =>
        (x.libelle ? x.libelle : '').toLowerCase().includes(term.toLowerCase()));
    }
  }
}
