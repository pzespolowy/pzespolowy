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
import { FavouriteResponse } from 'src/home/favourites-module/interfaces/favourite-response.interface';
import { TrackDetailsService } from 'src/details/services/track-details.service';
import { AlbumDetailsService } from 'src/details/services/album-details.service';

@Injectable({
	providedIn: 'root',
})
export class FavouriteService {
	apiPath = environment.apiPath;

	constructor(
		private http: HttpClient,
		private trackDetailsService: TrackDetailsService,
		private albumDetailsService: AlbumDetailsService
	) {}

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

	getFavourites(): Observable<FavouriteResponse[]> {
		return this.http
			.get<{ id: string }[]>(`${this.apiPath}/users/favorites/tracks`)
			.pipe(
				combineLatestWith(this.getFavouritesAlbums()),
				map(([tracks, albums]) => {
					const _tracks = tracks.map((e) => ({
						id: e.id,
						reviewType: ReviewType.TRACK,
					}));
					return [..._tracks, ...albums];
				})
			);
	}

	getFavouritesAlbums(): Observable<FavouriteResponse[]> {
		return this.http
			.get<{ id: string }[]>(`${this.apiPath}/users/favorites/albums`)
			.pipe(
				map((data) =>
					data.map((e) => ({
						id: e.id,
						reviewType: ReviewType.ALBUM,
					}))
				)
			);
	}

	getProperFavDetails(
		id: string,
		reviewType: ReviewType
	): Observable<FavouriteData> {
		if (reviewType === ReviewType.TRACK) {
			return this.trackDetailsService.getTrackDetails(id).pipe(
				map((track) => ({
					id: id,
					title: track.title,
					artist: track.artist.name,
					coverLink: track.coverSmall,
					reviewType: reviewType,
				}))
			);
		} else {
			return this.albumDetailsService.getAlbumDetails(id).pipe(
				map((album) => ({
					id: id,
					title: album.title,
					artist: album.artist.name,
					coverLink: album.coverSmall,
					reviewType: reviewType,
				}))
			);
		}
	}
}
