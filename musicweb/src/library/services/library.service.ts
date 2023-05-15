import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'lodash';
import { Observable, catchError, retry } from 'rxjs';
import { Album } from 'src/app/interfaces/album.interface';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { TrackResponse } from 'src/app/interfaces/track-response.interface';
import { Track } from 'src/app/interfaces/track.interface';
import { AlbumDetailsService } from 'src/details/services/album-details.service';
import { TrackDetailsService } from 'src/details/services/track-details.service';
import { environment } from 'src/environments/environment.development';
import { SearchService } from 'src/search/components/services/search.service';
import { SearchData } from 'src/search/interfaces/search-data.interface';

@Injectable({
	providedIn: 'root',
})
export class LibraryService {
	apiPath = environment.apiPath;

	constructor(
		private http: HttpClient,
		private searchService: SearchService,
		private trackDetailsService: TrackDetailsService,
		private albumDetails: AlbumDetailsService
	) {}

	search(query: string, type: ReviewType): Observable<SearchData[]> {
		if (type === ReviewType.TRACK) {
			return this.searchService.searchData(query, 20);
		}
		return this.searchService.searchAlbum(query, 20);
	}

	getAlbumDetails(id: string): Observable<Album> {
		return this.albumDetails.getAlbumDetails(id);
	}

	getTrackDetails(id: string): Observable<Track> {
		return this.trackDetailsService.getTrackDetails(id);
	}
}
