import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HeaderContentComponent } from './header-content/header-content.component';
import { MainContentComponent } from './main-content/main-content.component';
import { FooterContentComponent } from './footer-content/footer-content.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [MenuComponent, HeaderContentComponent, MainContentComponent, FooterContentComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot([]),
  ],
  exports: [MenuComponent, HeaderContentComponent, MainContentComponent, FooterContentComponent],
})
export class LayoutModule { }
