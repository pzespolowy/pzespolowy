import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, combineLatestWith, map } from 'rxjs';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { TrackResponse } from 'src/app/interfaces/track-response.interface';
import { Track } from 'src/app/interfaces/track.interface';
import { environment } from 'src/environments/environment';
import { ReviewService } from 'src/shared/services/review.service';

@Injectable({
	providedIn: 'root',
})
export class TrackDetailsService {
	apiPath = environment.apiPath;

	constructor(
		private http: HttpClient,
		private reviewService: ReviewService
	) {}

	getTrackDetails(id: string): Observable<Track> {
		return this.http.get<string[]>(`${this.apiPath}/tracks/${id}`).pipe(
			combineLatestWith(
				this.reviewService.getReviews(id, ReviewType.TRACK)
			),
			map(([data, reviews]) => {
				const _data: TrackResponse = JSON.parse(data[0]);
				const isFavourite = JSON.parse(data[1]);
				const { album, release_date, ...trackData } = _data;
				const track = {
					...trackData,
					...isFavourite,
					releaseData: release_date,
					albumId: album.id,
					albumTitle: album.title,
					coverSmall: album.cover_small,
					coverMedium: album.cover_medium,
					coverBig: album.cover_big,
					coverXl: album.cover_xl,
					rates: reviews,
				};
				return track;
			})
		);
	}
}
