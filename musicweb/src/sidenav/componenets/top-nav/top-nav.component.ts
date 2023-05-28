import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { AuthService } from 'src/app/services/auth.service';
import { selectUser } from 'src/app/store/user.selector';
import { SideNavLink } from 'src/sidenav/models/side-nav-link.inerface';
import { SideNavService } from 'src/sidenav/services/side-nav.service';

@Component({
	selector: 'mw-top-nav',
	templateUrl: './top-nav.component.html',
	styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
	@Input()
	title?: string;

	@Input()
	withoutLabel = false;

	isLogged = false;

	tabs: SideNavLink[] = [];

	user$ = this.store.select(selectUser);

	user?: UserInfo;

	constructor(
		private sidenavService: SideNavService,
		private store: Store,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.tabs = this.sidenavService.getTabs();
		this.user$.subscribe((user) => {
			this.isLogged = !!Object.keys(user ?? {}).length;
			if (user) this.user = user;
			this.tabs = this.sidenavService.getTabs();
		});
	}

	logout() {
		this.authService.logout();
	}
}
