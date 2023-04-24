import { Component, Input, Output } from '@angular/core';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { Review } from 'src/app/interfaces/review.interface';

@Component({
	selector: 'mw-reviews',
	templateUrl: './reviews.component.html',
})
export class ReviewsComponent {
	@Input()
	grade?: number;

	@Output()
	gradeChange?: number;

	@Input()
	id!: string;

	@Input()
	reviewType!: ReviewType;

	@Input()
	reviews?: Review[];
}
