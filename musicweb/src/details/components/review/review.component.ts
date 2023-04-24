import { Component, Input } from '@angular/core';
import { Review } from 'src/app/interfaces/review.interface';

@Component({
	selector: 'mw-review',
	templateUrl: './review.component.html',
	styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
	@Input()
	review!: Review;
}
