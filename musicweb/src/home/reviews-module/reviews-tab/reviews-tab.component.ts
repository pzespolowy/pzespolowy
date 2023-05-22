import { Component, OnInit } from '@angular/core';
import { MyReview } from 'src/app/interfaces/my-reviews.interface';
import { ReviewTabService } from './review-tab.service';
import { DetailsService } from 'src/details/services/details.service';

@Component({
	selector: 'mw-reviews-tab',
	templateUrl: './reviews-tab.component.html',
})
export class ReviewsTabComponent implements OnInit {
	reviews!: MyReview[];

	constructor(
		private reviewService: ReviewTabService,
		private detailsService: DetailsService
	) {}

	ngOnInit(): void {
		this.reviewService.getMyReviews().subscribe((revs) => {
			this.reviews = revs.map((elem) => {
				this.detailsService
					.getProperDetails(elem.id.toString(), elem.reviewType)
					.then((_title) => {
						const insert = { ...elem, title: _title };
						this.reviews.splice(
							this.reviews.findIndex(
								(e) =>
									e.id === elem.id &&
									e.reviewType === elem.reviewType
							),
							1,
							insert
						);
					});
				return { ...elem, title: '' };
			});
		});
	}
}
