import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { Rank } from 'src/app/interfaces/ranks.interface';
import { Review } from 'src/app/interfaces/review.interface';
import { environment } from 'src/environments/environment.development';
import { Response } from 'src/shared/interfaces/response.interface';

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
	): Observable<Response<string>> {
		return this.http
			.post(`${this.apiPath}/reviews/new`, {
				reviewSubjectId: id,
				reviewType: reviewType,
				grade: grade,
				description: description,
			})
			.pipe(
				map((_x) => {
					return { status: 200, data: 'OK' };
				}),
				catchError((x: HttpErrorResponse) => {
					return of({ status: 400, data: `${x.error.detail}` });
				})
			);
	}

	getReviews(id: string, reviewType: ReviewType): Observable<Rank> {
		return this.http
			.post<Rank>(`${this.apiPath}/reviews`, {
				reviewSubjectId: id,
				reviewType: reviewType,
			})
			.pipe(
				catchError(() => {
					return of({ averageRanking: 0, reviews: [] });
				})
			);
	}
}
