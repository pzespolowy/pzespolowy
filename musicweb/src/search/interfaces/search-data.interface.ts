import { CreationType } from 'src/app/interfaces/creation-type.enum';

export interface SearchData {
	creationType: CreationType;
	id: string;
	title: string;
	artist: string;
	coverLink: string;
}
