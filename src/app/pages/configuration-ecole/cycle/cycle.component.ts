import { Component, OnInit } from '@angular/core';
import {ConfigurationEcoleService} from '../../services/configuration-ecole.service';
import {NotificationService} from '../../services/notif.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Cycle} from '../../../modeles/cycle.model';

@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.scss']
})
export class CycleComponent implements OnInit {
  cycles = [] as Cycle[];
  cyclesFilter = [] as Cycle[];
  cycle = new Cycle();
  updateCycle = new Cycle();
  deleteCycle = new Cycle();

  constructor(private configEcole: ConfigurationEcoleService,
              private notif: NotificationService,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.ngxService.startLoader('cycle');
    this.configEcole.all().subscribe( data => {
      this.cycles = data;
    }, error1 => {
      console.log(error1);
    });
    this.ngxService.stopLoader('cycle');
    this.cyclesFilter = null;
  }

  save() {
    this.ngxService.startLoader('cycle');
    this.cycle.archiver = false;
    this.configEcole.saveCycle(this.cycle).subscribe( x => {
      this.configEcole.all().subscribe( data => this.cycles = data);
      this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
      this.cycle = new Cycle();
      }, error1 => {
      console.log(error1);
      this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
    });
    this.ngxService.stopLoader('cycle');
  }

  onUpdate(cycle: Cycle) {
    this.updateCycle = cycle;
  }

  onDelete(cycle: Cycle) {
    this.deleteCycle = cycle;
    if (confirm('Etes vous sûr de vouloir le supprimé ?')) {
      this.ngxService.startLoader('cycle');
      this.deleteCycle.archiver = true;
      this.configEcole.deleteCycle(this.deleteCycle).subscribe(x => {
        this.configEcole.all().subscribe( data => this.cycles = data);
        this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
      }, error1 => {
        this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
      });
      this.ngxService.stopLoader('cycle');
    }
  }

  update() {
    this.ngxService.startLoader('cycle');
    this.configEcole.saveCycle(this.updateCycle).subscribe( x => {
      console.log(x);
      this.configEcole.all().subscribe( data => this.cycles = data);
      this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
    }, error1 => {
      this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
    });
    this.ngxService.stopLoader('cycle');
  }

  search(term: string) {
    if (!term) {
      this.cyclesFilter = null;
    } else {
      this.cyclesFilter = this.cycles.filter(x =>
        (x.libelle ? x.libelle : '').toLowerCase().includes(term.toLowerCase()));
    }
  }
}
