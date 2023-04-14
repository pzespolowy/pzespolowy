import { CreationType } from 'src/app/interfaces/creation-type.enum';

export interface SearchResultData {
	id: string;
	title: string;
	artist: { name: string };
	album: { cover_small: string };
	type: CreationType;
}
