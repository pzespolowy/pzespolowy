import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SideNavLink } from 'src/sidenav/models/side-nav-link.inerface';
import { SideNavService } from 'src/sidenav/services/side-nav.service';

@Component({
	selector: 'mw-side-nav',
	templateUrl: './side-nav.component.html',
})
export class SideNavComponent implements OnInit {
	@Input()
	open = false;

	@Input()
	fixedOpen = false;

	@Output()
	openChange = new EventEmitter<boolean>();

	@Input()
	withoutLabel = false;

	isLogged = false;

	tabs: SideNavLink[] = [];

	constructor(private sidenavService: SideNavService) {}

	ngOnInit(): void {
		this.tabs = this.sidenavService.getTabs();
	}

	openStateChange() {
		this.open = !this.open;
		this.openChange.emit(this.open);
	}
}
