import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'mw-library',
	templateUrl: './library.component.html',
})
export class LibraryComponent {
	searchForm = this.fb.group({
		category: ['TRACK'],
		categoryQuery: [''],
		artistName: [''],
	});

	constructor(private fb: FormBuilder) {}

	search() {
		console.log(this.searchForm.getRawValue());
	}

	clear() {}

	get category() {
		return this.searchForm.controls.category.value || '';
	}

	get categoryQuery() {
		return this.searchForm.controls.categoryQuery.value;
	}

	get artistName() {
		return this.searchForm.controls.artistName.value;
	}
}
