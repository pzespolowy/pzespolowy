import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	BehaviorSubject,
	Observable,
	Subject,
	catchError,
	debounceTime,
	distinctUntilChanged,
	from,
	map,
	of,
	reduce,
	scan,
	switchMap,
	tap,
} from 'rxjs';
import { CreationType } from 'src/app/interfaces/creation-type.enum';
import { environment } from 'src/environments/environment';
import { SearchData } from 'src/search/interfaces/search-data.interface';
import { TrackResponse } from 'src/app/interfaces/track-response.interface';

@Injectable({
	providedIn: 'root',
})
export class SearchService {
	apiPath = environment.apiPath;

	constructor(private http: HttpClient) {}

	private searchData(query: string): Observable<SearchData[]> {
		const params = new HttpParams({ fromObject: { query } });
		return this.http
			.get<{ data: TrackResponse[] }>(
				`${this.apiPath}/homepage/search/tracks`,
				{
					params,
				}
			)
			.pipe(
				map((searchResults) =>
					searchResults.data.map((searchResult) => {
						return {
							artist: searchResult.artist.name,
							coverLink: searchResult.album.cover_small,
							id: searchResult.id,
							title: searchResult.title,
							creationType: searchResult.type,
						};
					})
				),
				catchError((error) => {
					return [];
				})
			);
	}

	search(query$: Subject<string>) {
		return query$.pipe(
			debounceTime(400),
			distinctUntilChanged(),
			switchMap((query) => this.searchData(query))
		);
	}
}
