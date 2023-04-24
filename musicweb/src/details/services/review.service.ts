import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { Review } from 'src/app/interfaces/review.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class ReviewService {
	apiPath = environment.apiPath;

	constructor(private http: HttpClient) {}

	postReviews(
		id: string,
		reviewType: ReviewType,
		grade: number,
		description?: string
	): Observable<Response> {
		return this.http.post<Response>(`${this.apiPath}/reviews/new`, {
			id: id,
			reviewType: reviewType,
			grade: grade,
			description: description,
		});
	}

	getReviews(id: string, reviewType: ReviewType): Observable<Review[]> {
		return this.http
			.post<Review[]>(`${this.apiPath}/reviews`, {
				reviewSubjectId: id,
				reviewType: reviewType,
			})
			.pipe(
				catchError(() => {
					return of([]);
				})
			);
	}
}
