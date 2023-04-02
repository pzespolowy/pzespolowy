import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { loginDto } from '../models/loginDto.interface';
import { afterLoginDto } from '../models/afterLoginDto.interface';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	apiPath = environment.apiPath;

	constructor(private http: HttpClient) {}

	public login(user: loginDto) {
		return this.http
			.post<afterLoginDto>(`${this.apiPath}/v1/auth/login`, user)
			.pipe(
				map((data) => ({
					status: 200,
					message: 'Successfully created',
				})),
				catchError((error: HttpErrorResponse) => {
					return of({
						status: error.status ?? 500,
						message: error.error.message ?? 'Api error',
					});
				})
			);
	}
}
