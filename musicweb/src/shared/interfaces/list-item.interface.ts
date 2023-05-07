import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';

export interface ListItem {
	id: string;
	coverLink: string;
	rank: number;
	rating: number;
	opinionCount: number;
	reviewType: ReviewType;
	genre?: string;
}
