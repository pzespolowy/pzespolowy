import {
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private localStorage: LocalStorageService,
		private authService: AuthService
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const authToken = this.localStorage.get('jwt');

		const isAuth = this.authService.isAuth();

		if (!authToken || !isAuth) {
			return next.handle(req);
		}

		const authReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${authToken}`,
			},
		});
		return next.handle(authReq);
	}
}
