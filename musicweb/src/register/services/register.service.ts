import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterData } from '../interfaces/register-data.interface';

@Injectable({
	providedIn: 'root',
})
export class RegisterService {
	constructor(private httpClient: HttpClient) {}

	private apiPath = environment.apiPath;

	register(userData: Partial<RegisterData>) {
		return this.httpClient
			.post(`${this.apiPath}/v1/auth/register`, userData)
			.pipe(
				map((data) => ({
					status: 201,
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
