import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../auth/authentication.service';
import {UtilisateurModel} from '../../modeles/utilisateur.model';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent implements OnInit {
userConnected = new UtilisateurModel();
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.identity().subscribe( data => this.userConnected = data, error1 => console.log(error1));
  }

  logout() { this.auth.logout(); }

}
