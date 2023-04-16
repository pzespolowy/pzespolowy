import { Artist } from './artist.interface';
import { CreationType } from './creation-type.enum';

export interface Track {
	id: string;
	title: string;
	duration: number;
	release_data: string;
	bpm: string;
	artist: Artist;
	cover_small: string;
	cover_medium: string;
	cover_big: string;
	cover_xl: string;
	albumTitle: string;
	albumId: string;
	type: CreationType;
	genre?: string;
}
