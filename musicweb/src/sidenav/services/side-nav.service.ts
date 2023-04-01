import { Injectable } from '@angular/core';
import { SideNavLink } from '../models/side-nav-link.inerface';

@Injectable({
	providedIn: 'root',
})
export class SideNavService {
	tabs: { tab: SideNavLink; auth: boolean }[] = [
		{
			tab: {
				message: 'Home',
				iconLink: 'homeIcon.svg',
				routerLink: '/home',
			},
			auth: false,
		},
		{
			tab: {
				message: 'Rankings',
				iconLink: 'rankingIcon.svg',
				routerLink: '/ranking',
			},
			auth: false,
		},
		{
			tab: {
				message: 'Music library',
				iconLink: 'libraryIcon.svg',
				routerLink: '/library',
			},
			auth: false,
		},
		{
			tab: {
				message: 'Fabourites',
				iconLink: 'favoriteIcon.svg',
				routerLink: '/favourite',
			},
			auth: true,
		},
		{
			tab: {
				message: 'My reviews',
				iconLink: 'reviewsIcon.svg',
				routerLink: '/reviews',
			},
			auth: true,
		},
		{
			tab: {
				message: 'Manage account',
				iconLink: 'personIcon.svg',
				routerLink: '/setting',
			},
			auth: true,
		},
	];

	getTabs(): SideNavLink[] {
		const isLogged = false;
		//check if user is logged

		return (
			this.tabs
				.filter((tab) => tab.auth === isLogged || !tab.auth)
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.map(({ auth, ...tab }) => tab.tab)
		);
	}
}
