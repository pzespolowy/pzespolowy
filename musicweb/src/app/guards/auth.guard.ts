import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { JwtService } from '../services/jwt.service';

export const authGuard = () => {
	const router = inject(Router);
	const localStorage = inject(LocalStorageService);
	const jwtService = inject(JwtService);

	if (localStorage.get('token') && !jwtService.isTokenExpired()) {
		return true;
	}

	return router.parseUrl('/login');
};
