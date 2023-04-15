import { Artist } from './artist.interface';
import { CreationType } from './creation-type.enum';
import { Track } from './track.interface';

export interface Album {
	id: string;
	title: string;
	cover_small: string;
	cover_medium: string;
	cover_big: string;
	cover_xl: string;
	release_date: string;
	artist?: Artist;
	genres?: {
		data: { name: string }[];
	};
	tracksCount?: number;
	tracks?: Track[];
	type: CreationType;
}
