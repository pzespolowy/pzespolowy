import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, combineLatestWith, map } from 'rxjs';
import { AlbumResponse } from 'src/app/interfaces/album-response.interface';
import { Album } from 'src/app/interfaces/album.interface';
import { CreationType } from 'src/app/interfaces/enums/creation-type.enum';
import { TrackResponse } from 'src/app/interfaces/track-response.interface';
import { environment } from 'src/environments/environment';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { ReviewService } from 'src/shared/services/review.service';

@Injectable({
	providedIn: 'root',
})
export class AlbumDetailsService {
	apiPath = environment.apiPath;

	constructor(
		private http: HttpClient,
		private reviewService: ReviewService
	) {}

	getAlbumDetails(id: string): Observable<Album> {
		return this.http.get<string[]>(`${this.apiPath}/albums/${id}`).pipe(
			combineLatestWith(
				this.reviewService.getReviews(id, ReviewType.ALBUM)
			),
			map(([albumData, rates]) => {
				const _data: AlbumResponse = JSON.parse(albumData[0]);
				const isFavourite = JSON.parse(albumData[1]);
				const { tracks, ...data } = _data;
				const album = {
					...isFavourite,
					id: data.id,
					title: data.title,
					coverSmall: data.cover_small,
					coverMedium: data.cover_medium,
					coverBig: data.cover_big,
					coverXl: data.cover_xl,
					releaseDate: data.release_date,
					artist: data.artist,
					genres: data.genres,
					tracksCount: data.nb_tracks,
					tracks: this.getTracks(tracks.data),
					type: ReviewType.ALBUM,
					rates: rates,
				};
				return album;
			})
		);
	}

	private getTracks(tracks: TrackResponse[]) {
		return tracks.map((data) => {
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
		});
	}
}
