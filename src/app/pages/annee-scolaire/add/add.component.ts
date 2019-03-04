import { Component, OnInit } from '@angular/core';
import {AnneeScolaire} from '../../../modeles/annee-scolaire.model';
import {AnneeScolaireService} from '../../services/annee-scolaire.service';
import {NotificationService} from '../../services/notif.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  anneeScolaire = new AnneeScolaire();
  constructor(
    private anneeScolaireService: AnneeScolaireService,
    ) { }

  ngOnInit() {
  }

  save() {
    this.anneeScolaire.encours = false;
    this.anneeScolaireService.save(this.anneeScolaire).subscribe( data => {
      console.log(data);
      // this.notif.success('Opération effectuée avec succès', '', {timeOut: 6000});
    }, error1 => {
      console.log(error1);
      // this.notif.error('Echec de l\'opération', '', {timeOut: 6000});
    });
  }

}
