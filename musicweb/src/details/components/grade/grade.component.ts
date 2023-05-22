import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';

import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';
import { ReviewService } from 'src/shared/services/review.service';

@Component({
	selector: 'mw-grade',
	templateUrl: './grade.component.html',
})
export class GradeComponent implements OnInit {
	@Input()
	grade?: number;

	@Output()
	gradeChange = new EventEmitter<number>();

	@Input()
	id!: string;

	@Input()
	reviewType!: ReviewType;

	@Input()
	simpleReview = false;

	@Input()
	userReview?: string;

	@Output()
	hideReviewBox: EventEmitter<void> = new EventEmitter();

	selectedGrade?: number;
	hoveredGrade = 1;
	sendedValue?: string;

	review = new FormControl('', { nonNullable: true });

	constructor(
		private reviewService: ReviewService,
		private customSnackbarService: CustomSnackbarService
	) {}

	ngOnInit(): void {
		this.review.setValue(this.userReview ?? '');
	}

	selectGrade(newGrade: number) {
		this.selectedGrade = newGrade;
		const grade = this.selectedGrade || this.grade || newGrade;
		if (this.grade) {
			this.reviewService
				.putReviews(this.id, this.reviewType, grade, this.sendedValue)
				.subscribe((x) => {
					this.reviewService.sendResponsePutMessage(
						x.status,
						grade,
						this.reviewType,
						x.data
					);
					if (x.status === 200) {
						this.grade = grade;
						this.gradeChange.emit(this.grade);
					} else {
						this.selectedGrade = undefined;
					}
				});
		} else {
			this.reviewService
				.postReviews(this.id, this.reviewType, grade, this.sendedValue)
				.subscribe((x) => {
					this.reviewService.sendResponsePostMessage(
						x.status,
						grade,
						this.reviewType,
						x.data
					);
					if (x.status === 200) {
						this.grade = grade;
						this.gradeChange.emit(this.grade);
					} else {
						this.selectedGrade = undefined;
					}
				});
		}
	}

	saveReview() {
		if (this.review.invalid) {
			this.customSnackbarService.error(
				'Review cannot be empty on this action',
				'Error during adding'
			);
			return;
		}

		const grade = this.selectedGrade || this.grade || 1;
		const description = this.review.value;

		if (this.grade) {
			this.reviewService
				.putReviews(this.id, this.reviewType, grade, description)
				.subscribe((x) => {
					this.reviewService.sendResponsePutMessage(
						x.status,
						grade,
						this.reviewType,
						x.data
					);
					if (x.status === 200) {
						this.sendedValue = description;
						this.grade = grade;
						this.gradeChange.emit(this.grade);
					} else {
						this.selectedGrade = undefined;
					}
				});
		} else {
			this.reviewService
				.postReviews(this.id, this.reviewType, grade, description)
				.subscribe((x) => {
					this.reviewService.sendResponsePostMessage(
						x.status,
						grade,
						this.reviewType,
						x.data
					);
					if (x.status === 200) {
						this.sendedValue = description;
						this.grade = grade;
						this.gradeChange.emit(this.grade);
					} else {
						this.selectedGrade = undefined;
					}
				});
		}
	}

	hoverGrade(i: number) {
		this.hoveredGrade = i;
	}

	sequence(n: number): Array<number> {
		return Array.from({ length: n }, (_, i) => i + 1);
	}
}
