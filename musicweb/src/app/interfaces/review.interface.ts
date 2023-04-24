import { ReviewType } from './enums/review-type.enum';

export interface Review {
	id: number;
	grade: number;
	reviewType: ReviewType;
	description?: string;
	postedAt?: string;
}
