import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TrackResponse } from 'src/app/interfaces/track-response.interface';
import { Track } from 'src/app/interfaces/track.interface';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class TrackDetailsService {
	apiPath = environment.apiPath;

	constructor(private http: HttpClient) {}

	getTrackDetails(id: string): Observable<Track> {
		return this.http.get<TrackResponse>(`${this.apiPath}/track/${id}`).pipe(
			map((data) => {
				const { album, release_date, ...trackData } = data;
				const track = {
					...trackData,
					releaseData: release_date,
					albumId: album.id,
					albumTitle: album.title,
					coverSmall: album.cover_small,
					coverMedium: album.cover_medium,
					coverBig: album.cover_big,
					coverXl: album.cover_xl,
				};
				return track;
			})
		);
	}
}
