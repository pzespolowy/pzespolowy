import { Injectable } from '@angular/core';
import { SideNavLink } from '../models/side-nav-link.inerface';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { JwtService } from 'src/app/services/jwt.service';

@Injectable({
	providedIn: 'root',
})
export class SideNavService {
	tabs: { tab: SideNavLink; auth: boolean }[] = [
		{
			tab: {
				message: 'Home',
				iconLink: 'homeIcon.svg',
				routerLink: '/musicweb/home',
			},
			auth: false,
		},
		{
			tab: {
				message: 'Rankings',
				iconLink: 'rankingIcon.svg',
				routerLink: '/musicweb/ranking',
			},
			auth: false,
		},
		{
			tab: {
				message: 'Music library',
				iconLink: 'libraryIcon.svg',
				routerLink: '/musicweb/library',
			},
			auth: false,
		},
		{
			tab: {
				message: 'Fabourites',
				iconLink: 'favoriteIcon.svg',
				routerLink: '/musicweb/favourite',
			},
			auth: true,
		},
		{
			tab: {
				message: 'My reviews',
				iconLink: 'reviewsIcon.svg',
				routerLink: '/musicweb/reviews',
			},
			auth: true,
		},
		{
			tab: {
				message: 'Manage account',
				iconLink: 'personIcon.svg',
				routerLink: '/musicweb/setting',
			},
			auth: true,
		},
	];

	constructor(
		private localStorage: LocalStorageService,
		private jwtService: JwtService
	) {}

	getTabs(): SideNavLink[] {
		const token = this.localStorage.get('token');
		const isLogged = token && !this.jwtService.isTokenExpired();

		return (
			this.tabs
				.filter((tab) => tab.auth === isLogged || !tab.auth)
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.map(({ auth, ...tab }) => tab.tab)
		);
	}
}
