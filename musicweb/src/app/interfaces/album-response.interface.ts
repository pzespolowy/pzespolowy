import { Artist } from './artist.interface';
import { TrackResponse } from './track-response.interface';

export interface AlbumResponse {
	id: string;
	title: string;
	cover_small: string;
	cover_medium: string;
	cover_big: string;
	cover_xl: string;
	artist: Artist;
	genres: {
		data: { name: string }[];
	};
	nb_tracks: number;
	release_date: string;
	tracks: {
		data: TrackResponse[];
	};
}
