import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ReviewResponse } from 'src/app/interfaces/review-response.interface';
import { Review } from 'src/app/interfaces/review.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class ReviewTabService {
	apiPath = environment.apiPath;

	constructor(private http: HttpClient) {}

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
}
