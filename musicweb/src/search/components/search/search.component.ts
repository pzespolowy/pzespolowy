import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SearchService } from '../services/search.service';
import { SearchData } from 'src/search/interfaces/search-data.interface';

@Component({
	selector: 'mw-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
	searchControl = new FormControl('', { nonNullable: true });
	query$ = new Subject<string>();
	results$: Observable<Array<SearchData>> = new Observable<
		Array<SearchData>
	>();
	hasData = false;
	resultsVisible = false;

	constructor(private searchService: SearchService) {
		this.results$ = this.searchService.search(this.query$);
		this.results$.subscribe((x) => (this.hasData = !!x.length));
	}

	get search(): string {
		return this.searchControl.value?.trim();
	}

	identify(index: number, searchData: SearchData) {
		return searchData.id;
	}

	showResults() {
		this.resultsVisible = true;
	}

	hideResults() {
		this.resultsVisible = false;
	}
}
