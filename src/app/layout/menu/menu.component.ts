import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../auth/authentication.service';
import {UtilisateurModel} from '../../modeles/utilisateur.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  userConnected = new UtilisateurModel();
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    // @ts-ignore
    $(document).ready(() => {
      // @ts-ignore
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
    this.auth.identity().subscribe( data => this.userConnected = data, error1 => console.log(error1));
  }

}
