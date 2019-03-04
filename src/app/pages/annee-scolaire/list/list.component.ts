import { Component, OnInit } from '@angular/core';
import {AnneeScolaire} from '../../../modeles/annee-scolaire.model';
import {AnneeScolaireService} from '../../services/annee-scolaire.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  anneeScolaires = [] as AnneeScolaire[];
  constructor(private anneeScolaireService: AnneeScolaireService) { }

  ngOnInit() {
    this.anneeScolaireService.all().subscribe(data => {
      this.anneeScolaires = data;
    });
  }

  onActive(anneeScolaire) {
    const ans = anneeScolaire as AnneeScolaire;
    ans.encours = true;
    this.anneeScolaireService.save(ans).subscribe( data => {
      console.log(data);
      this.anneeScolaireService.all().subscribe(data1 => {
        this.anneeScolaires = data1;
      });
      // this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
    }, error1 => {
      console.log(error1);
      // this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
    });
  }
  onDesactive(anneeScolaire) {
    const ans = anneeScolaire as AnneeScolaire;
    ans.encours = false;
    this.anneeScolaireService.save(ans).subscribe( data => {
      console.log(data);
      this.anneeScolaireService.all().subscribe(data1 => {
        this.anneeScolaires = data1;
      });
      // this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
    }, error1 => {
      console.log(error1);
      // this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
    });
  }

}
