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
				const { album, ...trackData } = data;
				const track = {
					...trackData,
					albumId: album.id,
					albumTitle: album.title,
					cover_small: album.cover_small,
					cover_medium: album.cover_medium,
					cover_big: album.cover_big,
					cover_xl: album.cover_xl,
				};
				return track;
			})
		);
	}
}
