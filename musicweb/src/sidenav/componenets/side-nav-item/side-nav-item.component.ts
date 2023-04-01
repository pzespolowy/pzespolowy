import { Component, Input } from '@angular/core';
import { SideNavLink } from 'src/sidenav/models/side-nav-link.inerface';

@Component({
	selector: 'mw-side-nav-item',
	templateUrl: './side-nav-item.component.html',
	styleUrls: ['./side-nav-item.component.scss'],
})
export class SideNavItemComponent {
	@Input()
	isOpen!: boolean;

	@Input()
	withoutLabel = false;

	@Input()
	sideNavData!: SideNavLink;
}
