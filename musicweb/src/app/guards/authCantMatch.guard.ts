import { inject } from '@angular/core';
import { JwtService } from '../services/jwt.service';
import { LocalStorageService } from '../services/local-storage.service';
import { CanMatchFn } from '@angular/router';

export const authCantMatch: CanMatchFn = () => {
	const localStorage = inject(LocalStorageService);
	const jwtService = inject(JwtService);

	if (localStorage.get('token') && !jwtService.isTokenExpired()) {
		return false;
	}

	return true;
};
