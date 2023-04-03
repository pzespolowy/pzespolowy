import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
	providedIn: 'root',
})
export class JwtService {
	jwtToken!: string;
	decodedToken!: { [key: string]: string };

	setToken(token: string): void {
		this.jwtToken = token;
	}

	decodeToken(): void {
		if (this.jwtToken) {
			this.decodedToken = jwt_decode(this.jwtToken);
		}
	}

	getDecodedToken(): { [key: string]: string } {
		return this.decodedToken;
	}

	getExpiryTime() {
		this.decodeToken();
		return this.decodedToken ? this.decodedToken['exp'] : null;
	}

	isTokenExpired(): boolean {
		const expiryTime = this.getExpiryTime();
		const expiryTimeNumber = expiryTime ? parseInt(expiryTime) : 0;
		return 1000 * expiryTimeNumber - new Date().getTime() < 5000;
	}
}
