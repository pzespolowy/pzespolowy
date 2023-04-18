import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'mw-grade',
	templateUrl: './grade.component.html',
})
export class GradeComponent {
	@Input()
	grade?: number;

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
