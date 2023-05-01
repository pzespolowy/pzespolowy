import { Component, Input } from '@angular/core';
import { MyReview } from 'src/app/interfaces/my-reviews.interface';
import { Review } from 'src/app/interfaces/review.interface';

@Component({
	selector: 'mw-review',
	templateUrl: './review.component.html',
	styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
	@Input()
	review!: Review;

	@Input()
	myReview!: MyReview;
}
