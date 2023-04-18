import { Artist } from './artist.interface';
import { CreationType } from './creation-type.enum';

export interface Track {
	id: string;
	title: string;
	duration: number;
	releaseData: string;
	bpm: string;
	artist: Artist;
	coverSmall: string;
	coverMedium: string;
	coverBig: string;
	coverXl: string;
	albumTitle: string;
	albumId: string;
	type: CreationType;
	preview: string;
	genre?: string;
}
