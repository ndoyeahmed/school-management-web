import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // @ts-ignore
    $(document).ready(() => {
      // @ts-ignore
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
  }

}
