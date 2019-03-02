import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../auth/authentication.service';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.scss']
})
export class HeaderContentComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  logout() { this.auth.logout(); }

}
