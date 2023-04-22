import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { SearchService } from '../services/search.service';
import { SearchData } from 'src/search/interfaces/search-data.interface';

@Component({
	selector: 'mw-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy, OnInit {
	searchControl = new FormControl('', { nonNullable: true });
	query$ = new Subject<string>();
	hasData = false;
	resultsVisible = false;
	results: Array<SearchData> = [];
	subscription?: Subscription;

	constructor(private searchService: SearchService) {}

	ngOnInit(): void {
		this.subscription = this.searchService
			.search(this.query$)
			.subscribe((x) => {
				this.hasData = !!x.length;
				this.results = x;
			});
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
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
