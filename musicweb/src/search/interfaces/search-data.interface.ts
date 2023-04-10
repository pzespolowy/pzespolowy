import { CreationType } from 'src/app/interfaces/creation-type.enum';

export interface SearchData {
	creationType: CreationType;
	id: string;
	title: string;
	author: string;
	genre: string;
}
