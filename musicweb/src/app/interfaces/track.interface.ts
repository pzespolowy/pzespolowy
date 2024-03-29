import { Album } from './album.interface';
import { Artist } from './artist.interface';
import { CreationType } from './enums/creation-type.enum';
import { ReviewType } from './enums/review-type.enum';
import { Rank } from './ranks.interface';

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
	type: ReviewType;
	preview: string;
	genre?: string;
	isFavourite?: boolean;
	rates?: Rank;
}
