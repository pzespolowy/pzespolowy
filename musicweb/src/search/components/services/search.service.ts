import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	BehaviorSubject,
	Observable,
	Subject,
	debounceTime,
	distinctUntilChanged,
	of,
	switchMap,
} from 'rxjs';
import { CreationType } from 'src/app/interfaces/creation-type.enum';
import { environment } from 'src/environments/environment';
import { SearchData } from 'src/search/interfaces/search-data.interface';

@Injectable({
	providedIn: 'root',
})
export class SearchService {
	apiPath = environment.apiPath;

	constructor(private http: HttpClient) {}

	private searchData(query: string): Observable<SearchData[]> {
		const params = new HttpParams({ fromObject: { query } });
		return this.http.get<SearchData[]>(`${this.apiPath}/search`, {
			params,
		});
	}

	search(query$: BehaviorSubject<string>) {
		return query$.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			switchMap((query) => this.dumnySerch(query))
		);
	}

	dumnySerch(query: string): Observable<SearchData[]> {
		return of([
			{
				creationType: CreationType.SONG,
				id: '1',
				title: 'tytul',
				author: 'dzinasoa',
				genre: 'rap',
			},
		]);
	}
}
