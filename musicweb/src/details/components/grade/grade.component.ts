import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { Track } from 'src/app/interfaces/track.interface';
import { ReviewService } from 'src/details/services/review.service';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';

@Component({
	selector: 'mw-grade',
	templateUrl: './grade.component.html',
})
export class GradeComponent {
	@Input()
	grade?: number;

	@Input()
	track!: Track;

	@Output()
	hideReviewBox: EventEmitter<boolean> = new EventEmitter();

	selectedGrade?: number;
	hoveredGrade = 1;

	review = new FormControl('', { nonNullable: true });

	constructor(
		private reviewService: ReviewService,
		private customSnackbarService: CustomSnackbarService
	) {}

	selectGrade(newGrade: number) {
		this.selectedGrade = newGrade;
		//make api call
	}

	saveReview() {
		if (this.review.invalid) {
			this.customSnackbarService.error(
				'Review cannot be empty on this action',
				'Error during adding'
			);
			return;
		}
		const _grade = this.selectedGrade || this.grade || 1;
		this.reviewService
			.postReviews(
				this.track.id,
				ReviewType.TRACK,
				_grade,
				this.review.value
			)
			.subscribe((x) => {
				if (x.status !== 200)
					this.customSnackbarService.success(
						`Successfully added review with grade ${_grade} to track ${this.track.title}`,
						'Successfully added review'
					);
			});
	}

	hoverGrade(i: number) {
		this.hoveredGrade = i;
	}

	sequence(n: number): Array<number> {
		return Array.from({ length: n }, (_, i) => i + 1);
	}
}
