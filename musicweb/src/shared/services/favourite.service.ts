import {
	HttpClient,
	HttpErrorResponse,
	HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	Observable,
	catchError,
	combineLatestWith,
	concatMap,
	map,
	of,
} from 'rxjs';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { Response } from '../interfaces/response.interface';
import { environment } from 'src/environments/environment.development';
import { FavouriteData } from 'src/home/favourites-module/interfaces/favourite-data.interface';

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
						data: 'Cannot add',
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
						data: 'Cannot remove',
					});
				})
			);
	}

	getFavourites(): Observable<FavouriteData[]> {
		return this.http.get(`${this.apiPath}/users/favorites/tracks`).pipe(
			combineLatestWith(this.getFavouritesAlbums()),
			map(([tracks, albums]) => [
				{
					id: '123123',
					title: 'tytul',
					reviewType: ReviewType.TRACK,
					artist: {
						id: 'string',
						name: 'artista',
						picture: 'string',
						picture_small: 'string',
						picture_medium: 'string',
						picture_big: 'string',
						picture_xl: 'string',
					},
					coverLink: 'empty',
				},
			])
		);
	}

	getFavouritesAlbums(): Observable<FavouriteData[]> {
		return this.http.get(`${this.apiPath}/users/favorites/albums`).pipe(
			map((data) => [
				{
					id: '123123',
					title: 'tytul',
					reviewType: ReviewType.TRACK,
					artist: {
						id: 'string',
						name: 'artista',
						picture: 'string',
						picture_small: 'string',
						picture_medium: 'string',
						picture_big: 'string',
						picture_xl: 'string',
					},
					coverLink: 'empty',
				},
			])
		);
	}
}
