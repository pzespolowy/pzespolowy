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
				routerLink: '/musicweb/home/ranking',
			},
			auth: false,
		},
		{
			tab: {
				message: 'Music library',
				iconLink: 'libraryIcon.svg',
				routerLink: '/musicweb/home/library',
			},
			auth: false,
		},
		{
			tab: {
				message: 'Favourites',
				iconLink: 'favoriteIcon.svg',
				routerLink: '/musicweb/home/favourite',
				additionalClass: 'filter-color',
			},
			auth: true,
		},
		{
			tab: {
				message: 'My reviews',
				iconLink: 'reviewsIcon.svg',
				routerLink: '/musicweb/home/reviews',
			},
			auth: true,
		},
		{
			tab: {
				message: 'Manage account',
				iconLink: 'personIcon.svg',
				routerLink: '/musicweb/home/setting',
			},
			auth: true,
		},
	];

	constructor(
		private localStorage: LocalStorageService,
		private jwtService: JwtService
	) {}

	getTabs(): SideNavLink[] {
		const token = this.localStorage.get('jwt');
		const isLogged = token && !this.jwtService.isTokenExpired();

		return (
			this.tabs
				.filter((tab) => tab.auth === isLogged || !tab.auth)
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				.map(({ auth, ...tab }) => tab.tab)
		);
	}
}
