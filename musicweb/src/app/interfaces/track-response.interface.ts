import { AlbumResponse } from './album-response.interface';
import { Artist } from './artist.interface';
import { CreationType } from './creation-type.enum';

export interface TrackResponse {
	id: string;
	title: string;
	duration: number;
	release_data: string;
	bpm: string;
	artist: Artist;
	album: AlbumResponse;
	type: CreationType;
}
