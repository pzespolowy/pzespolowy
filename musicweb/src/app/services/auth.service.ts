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

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	apiPath = environment.apiPath;

	constructor(
		private http: HttpClient,
		private localStorage: LocalStorageService,
		private store: Store
	) {}

	public login(user: loginDto) {
		return this.http
			.post<afterLoginDto>(`${this.apiPath}/v1/auth/login`, user)
			.pipe(
				map((data) => {
					this.localStorage.set('jwt', data.token);
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
			.post<afterLoginDto>(`${this.apiPath}/v1/auth/register`, userData)
			.pipe(
				map((data) => ({
					status: 201,
					message: data,
				})),
				catchError((error: HttpErrorResponse) => {
					return of({
						status: error.status ?? 500,
						message: error.error.message ?? 'Api error',
					});
				})
			);
	}

	logout() {
		this.localStorage.remove('token');
		this.store.dispatch(UserActions.removeUser());
	}
}
