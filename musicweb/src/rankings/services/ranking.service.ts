import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { ListItem } from 'src/shared/interfaces/list-item.interface';
import { RankingData } from '../interfaces/ranking-data.interface';
import { environment } from 'src/environments/environment.development';
import {
	BehaviorSubject,
	Observable,
	catchError,
	distinctUntilChanged,
	firstValueFrom,
	forkJoin,
	map,
	of,
	switchMap,
} from 'rxjs';
import { TrackDetailsService } from 'src/details/services/track-details.service';
import { AlbumDetailsService } from 'src/details/services/album-details.service';
import { RankingResponse } from '../interfaces/ranking-response.interface';

@Injectable({
	providedIn: 'root',
})
export class RankingService {
	apiPath = environment.apiPath;

	constructor(
		private http: HttpClient,
		private trackDetailsService: TrackDetailsService,
		private albumDetailsService: AlbumDetailsService
	) {}

	private getRankingByType(
		reviewType: ReviewType
	): Observable<RankingResponse[]> {
		return this.http
			.get<RankingResponse[]>(
				`${this.apiPath}/${reviewType.toLowerCase()}s/ranking`
			)
			.pipe(catchError(() => of([])));
	}

	getProperDetails(
		rankData: RankingResponse,
		reviewType: ReviewType
	): Observable<RankingData> {
		if (reviewType === ReviewType.TRACK) {
			return this.trackDetailsService
				.getTrackDetails(rankData.reviews[0].reviewSubjectId.toString())
				.pipe(
					map((track) => ({
						...rankData,
						title: track.title,
						artist: track.artist,
						coverLink: track.coverSmall,
					}))
				);
		} else {
			return this.albumDetailsService
				.getAlbumDetails(rankData.reviews[0].reviewSubjectId.toString())
				.pipe(
					map((album) => ({
						...rankData,
						title: album.title,
						artist: album.artist,
						genre: album.genres?.data[0].name,
						coverLink: album.coverSmall,
					}))
				);
		}
	}

	getRanking(type$: BehaviorSubject<ReviewType>) {
		return type$.pipe(
			distinctUntilChanged(),
			switchMap((type) => this.getRankingByType(type))
		);
	}
}
