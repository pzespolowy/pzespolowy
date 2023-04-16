import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { JwtService } from './services/jwt.service';
import { AuthService } from './services/auth.service';

@Component({
	selector: 'mw-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	title = 'musicweb';

	constructor(
		private localStorage: LocalStorageService,
		private jwtService: JwtService,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		const token = this.localStorage.get('jwt');
		if (token) {
			this.jwtService.setToken(token);
			this.authService.getUserInfo();
		}
	}
}
