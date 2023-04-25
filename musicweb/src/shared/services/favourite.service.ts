import {
	HttpClient,
	HttpErrorResponse,
	HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { Response } from '../interfaces/response.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class FavouriteService {
	apiPath = environment.apiPath;

	constructor(private http: HttpClient) {}

	postFavourite(
		id: string,
		reviewType: ReviewType
	): Observable<Response<string>> {
		const params = {
			params: new HttpParams().set(`${reviewType.toLowerCase()}Id`, id),
		};
		return this.http
			.post(
				`${this.apiPath}/${reviewType.toLowerCase()}s/favourites`,
				{},
				params
			)
			.pipe(
				map(() => ({
					status: 200,
					data: 'Succefully added',
				})),
				catchError((x: HttpErrorResponse) => {
					return of({
						status: x.error.status,
						data: x.error.details,
					});
				})
			);
	}

	deleteFavourite(
		id: string,
		reviewType: ReviewType
	): Observable<Response<string>> {
		const params = {
			params: new HttpParams().set(`${reviewType.toLowerCase()}Id`, id),
		};
		return this.http
			.delete(
				`${this.apiPath}/${reviewType.toLowerCase()}s/favourites`,
				params
			)
			.pipe(
				map(() => ({
					status: 200,
					data: 'Succefully removed',
				})),
				catchError((x: HttpErrorResponse) => {
					return of({
						status: x.error.status,
						data: x.error.details,
					});
				})
			);
	}
}
