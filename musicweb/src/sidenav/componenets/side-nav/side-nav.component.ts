import { Component } from '@angular/core';
import { SideNavLink } from 'src/sidenav/models/side-nav-link.inerface';

@Component({
  selector: 'mw-side-nav',
  templateUrl: './side-nav.component.html'
})
export class SideNavComponent {
  isOpen: boolean = false;

  isLogged: boolean = false;

  tabs: SideNavLink[] = [];

  openStateChange() {
    this.isOpen = !this.isOpen;
  }
}
