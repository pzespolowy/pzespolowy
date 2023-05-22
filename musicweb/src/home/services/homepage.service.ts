import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, combineLatestWith, map } from 'rxjs';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { Rank } from 'src/app/interfaces/ranks.interface';
import { TrackResponse } from 'src/app/interfaces/track-response.interface';
import { Track } from 'src/app/interfaces/track.interface';
import { TrackDetailsService } from 'src/details/services/track-details.service';
import { environment } from 'src/environments/environment';
import { SearchService } from 'src/search/components/services/search.service';
import { ReviewService } from 'src/shared/services/review.service';

@Injectable({
	providedIn: 'root',
})
export class HomepageService {
	apiPath = environment.apiPath;

	constructor(
		private http: HttpClient,
		private reviewService: ReviewService,
		private trackDetailsService: TrackDetailsService
	) {}

	getTracks(): Observable<Track[]> {
		return this.http
			.get<{ data: TrackResponse[] }>(`${this.apiPath}/tracks/top`)
			.pipe(
				map((response) => {
					return response.data.map((data) => {
						const { album, release_date, ...trackData } = data;
						const track = {
							...trackData,
							releaseData: release_date,
							albumId: album.id,
							albumTitle: album.title,
							coverSmall: album.cover_small,
							coverMedium: album.cover_medium,
							coverBig: album.cover_big,
							coverXl: album.cover_xl,
							type: ReviewType.TRACK,
						};
						return track;
					});
				})
			);
	}

	getTrackRank(track: Track): Observable<Track> {
		return this.reviewService.getReviews(track.id, ReviewType.TRACK).pipe(
			map((e) => {
				return {
					...track,
					rates: e,
				};
			})
		);
	}
}
