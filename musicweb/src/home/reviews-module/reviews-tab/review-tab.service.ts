import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, map, of } from 'rxjs';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { MyReview } from 'src/app/interfaces/my-reviews.interface';
import { ReviewResponse } from 'src/app/interfaces/review-response.interface';
import { Review } from 'src/app/interfaces/review.interface';
import { AlbumDetailsService } from 'src/details/services/album-details.service';
import { TrackDetailsService } from 'src/details/services/track-details.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class ReviewTabService {
	apiPath = environment.apiPath;

	constructor(
		private http: HttpClient,
		private trackDetailsService: TrackDetailsService,
		private albumDetailsService: AlbumDetailsService
	) {}

	getMyReviews(): Observable<Review[]> {
		return this.http
			.get<ReviewResponse[]>(`${this.apiPath}/reviews/currentuser`)
			.pipe(
				map((reviews) => {
					return reviews.map((_review) => {
						const { reviewSubjectId, ...reviewData } = _review;
						const review = {
							...reviewData,
							id: reviewSubjectId,
						};
						return review;
					});
				}),
				catchError(() => {
					return of([]);
				})
			);
	}

	async getProperDetails(review: Review) {
		let title = '';
		if (review.reviewType === ReviewType.TRACK) {
			const track = await firstValueFrom(
				this.trackDetailsService.getTrackDetails(review.id.toString())
			);
			title = track.title;
		} else {
			const album = await firstValueFrom(
				this.albumDetailsService.getAlbumDetails(review.id.toString())
			);
			title = album.title;
		}

		return title;
	}
}
