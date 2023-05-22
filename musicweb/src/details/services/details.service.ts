import { Injectable } from '@angular/core';
import { AlbumDetailsService } from './album-details.service';
import { TrackDetailsService } from './track-details.service';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DetailsService {
	constructor(
		private trackDetailsService: TrackDetailsService,
		private albumDetailsService: AlbumDetailsService
	) {}

	async getProperDetails(id: string, review: ReviewType) {
		let title = '';
		if (review === ReviewType.TRACK) {
			const track = await firstValueFrom(
				this.trackDetailsService.getTrackDetails(id)
			);
			title = track.title;
		} else {
			const album = await firstValueFrom(
				this.albumDetailsService.getAlbumDetails(id)
			);
			title = album.title;
		}

		return title;
	}
}
