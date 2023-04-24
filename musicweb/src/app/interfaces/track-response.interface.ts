import { AlbumResponse } from './album-response.interface';
import { Artist } from './artist.interface';
import { CreationType } from './enums/creation-type.enum';

export interface TrackResponse {
	id: string;
	title: string;
	duration: number;
	release_date: string;
	bpm: string;
	artist: Artist;
	album: AlbumResponse;
	type: CreationType;
	preview: string;
}
