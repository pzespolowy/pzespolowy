import { Component, Input } from '@angular/core';
import { SideNavLink } from 'src/sidenav/models/side-nav-link.inerface';
import { SideNavService } from 'src/sidenav/services/side-nav.service';

@Component({
  selector: 'mw-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  @Input()
	title?: string;

  @Input()
	withoutLabel = false;

	isLogged = false;
  
	tabs: SideNavLink[] = [];

	constructor(private sidenavService: SideNavService) {}

	ngOnInit(): void {
		this.tabs = this.sidenavService.getTabs();
	}

}
