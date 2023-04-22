import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app-state.interface';
import { selectUser } from 'src/app/store/user.selector';
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

	user$ = this.store.select(selectUser);

	user?: UserInfo;

	constructor(
		private sidenavService: SideNavService,
		private authService: AuthService,
		private store: Store
	) {}

	ngOnInit(): void {
		this.tabs = this.sidenavService.getTabs();
		this.user$.subscribe((user) => {
			this.isLogged = !!Object.keys(user ?? {}).length;
			if (user) this.user = user;
			this.tabs = this.sidenavService.getTabs();
		});
	}

	openStateChange() {
		this.open = !this.open;
		this.openChange.emit(this.open);
	}

	logout() {
		this.authService.logout();
	}
}
