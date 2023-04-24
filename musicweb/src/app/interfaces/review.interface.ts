import { ReviewType } from './enums/review-type.enum';

export interface Review {
	id: number;
	grade: number;
	description?: string;
	reviewType: ReviewType;
}
