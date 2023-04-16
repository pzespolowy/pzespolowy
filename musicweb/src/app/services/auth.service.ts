import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterData } from 'src/register/interfaces/register-data.interface';
import { LocalStorageService } from './local-storage.service';
import { environment } from 'src/environments/environment.development';
import { loginDto } from 'src/login/models/loginDto.interface';
import { afterLoginDto } from '../interfaces/afterLoginDto.interface';
import { catchError, map, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserActions } from '../store/user.actions';
import { JwtService } from './jwt.service';
import { UserInfo } from '../interfaces/user-info.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	apiPath = environment.apiPath;
	redirectUrl = '/musicweb/home';

	constructor(
		private http: HttpClient,
		private localStorage: LocalStorageService,
		private store: Store,
		private jwtService: JwtService
	) {}

	public login(user: loginDto) {
		return this.http
			.post<afterLoginDto>(`${this.apiPath}/auth/login`, user)
			.pipe(
				map((data) => {
					this.localStorage.set('jwt', data.token);
					this.jwtService.setToken(data.token);
					return {
						status: 200,
						message: data,
					};
				}),
				catchError((error: HttpErrorResponse) => {
					return of({
						status: error.status ?? 500,
						message: error.error.message ?? 'Api error',
					});
				})
			);
	}

	register(userData: Partial<RegisterData>) {
		return this.http
			.post<afterLoginDto>(`${this.apiPath}/auth/register`, userData)
			.pipe(
				map((data) => {
					this.localStorage.set('jwt', data.token);
					this.jwtService.setToken(data.token);
					return {
						status: 201,
						message: data,
					};
				}),
				catchError((error: HttpErrorResponse) => {
					return of({
						status: error.status ?? 500,
						message: error.error.message ?? 'Api error',
					});
				})
			);
	}

	logout() {
		this.localStorage.remove('jwt');
		this.store.dispatch(UserActions.removeUser());
	}

	isAuth(): boolean {
		if (
			!!this.localStorage.get('jwt') &&
			this.jwtService.isTokenExpired()
		) {
			this.logout();
		}
		return (
			!!this.localStorage.get('jwt') && !this.jwtService.isTokenExpired()
		);
	}

	getUserInfo() {
		this.http
			.get<UserInfo>(`${this.apiPath}/users/currentuser`)
			.subscribe((userInfo) => {
				this.store.dispatch(UserActions.addUser({ user: userInfo }));
			});
	}
}
