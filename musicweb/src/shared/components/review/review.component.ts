import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
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

	constructor(private router: Router) {}

	navigateToDetails() {
		let path = '/musicweb/home/';
		path += this.myReview.reviewType === ReviewType.ALBUM ? 'album' : '';
		path += 'details';
		this.router.navigate([path, this.myReview.id]);
	}
}
