import { Artist } from './artist.interface';
import { CreationType } from './enums/creation-type.enum';
import { Rank } from './ranks.interface';
import { Rating } from './ratings.interface';
import { Track } from './track.interface';

export interface Album {
	id: string;
	title: string;
	coverSmall: string;
	coverMedium: string;
	coverBig: string;
	coverXl: string;
	releaseDate: string;
	artist: Artist;
	genres?: {
		data: { name: string }[];
	};
	tracksCount?: number;
	tracks?: Track[];
	type: CreationType;
	isFavourite?: boolean;
	rates?: Rank;
}
