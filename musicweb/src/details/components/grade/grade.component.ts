import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'mw-grade',
	templateUrl: './grade.component.html',
})
export class GradeComponent {
	@Input()
	grade?: number;

	selectedGrade = 1;

	review = new FormControl('', { nonNullable: true });

	selectGrade(newGrade: number) {
		this.selectedGrade = newGrade;
		//make api call
	}

	saveReview() {}
}
