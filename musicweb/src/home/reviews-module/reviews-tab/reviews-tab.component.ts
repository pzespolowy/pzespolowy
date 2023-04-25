import { Component, OnInit } from '@angular/core';
import { MyReview } from 'src/app/interfaces/my-reviews.interface';
import { ReviewTabService } from './review-tab.service';

@Component({
	selector: 'mw-reviews-tab',
	templateUrl: './reviews-tab.component.html',
})
export class ReviewsTabComponent implements OnInit {
	reviews!: MyReview[];

	constructor(private reviewService: ReviewTabService) {}

	ngOnInit(): void {
		this.reviewService.getMyReviews().subscribe((revs) => {
			this.reviews = revs.map((elem) => {
				this.reviewService.getProperDetails(elem).then((_title) => {
					const insert = { ...elem, title: _title };
					this.reviews.splice(
						this.reviews.findIndex((e) => e === elem),
						1,
						insert
					);
				});
				return { ...elem, title: '' };
			});
		});
	}
}
