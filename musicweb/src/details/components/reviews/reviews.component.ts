import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { Review } from 'src/app/interfaces/review.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'mw-reviews',
	templateUrl: './reviews.component.html',
})
export class ReviewsComponent {
	@Input()
	grade!: number;

	@Output()
	gradeChange = new EventEmitter<number>();

	@Input()
	id!: string;

	@Input()
	reviewType!: ReviewType;

	@Input()
	reviews?: Review[];

	isAuth = false;

	constructor(private authService: AuthService) {
		this.isAuth = authService.isAuth();
	}

	gradeChanged(val: number) {
		this.grade = val;
		this.gradeChange.emit(val);
	}
}
