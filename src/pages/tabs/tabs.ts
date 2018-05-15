import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

import { GentePage } from '../gente/gente';
import { PruebaPage } from '../prueba/prueba';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = GentePage;
  tab2Root = PruebaPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
