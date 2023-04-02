import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'mw-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
	searchControl = new FormControl('', { nonNullable: true });

	get search(): string {
		return this.searchControl.value?.trim();
	}

	searchData() {}
}
