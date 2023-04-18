import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'mw-grade',
	templateUrl: './grade.component.html',
})
export class GradeComponent {
	@Input()
	grade?: number;

	@Output()
	hideReviewBox: EventEmitter<boolean> = new EventEmitter();

	selectedGrade?: number;
	hoveredGrade = 1;

	review = new FormControl('', { nonNullable: true });

	selectGrade(newGrade: number) {
		this.selectedGrade = newGrade;
		//make api call
	}

	saveReview() {}

	hoverGrade(i: number) {
		this.hoveredGrade = i;
	}

	sequence(n: number): Array<number> {
		return Array.from({ length: n }, (_, i) => i + 1);
	}
}
