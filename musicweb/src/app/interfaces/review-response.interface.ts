import { ReviewType } from './enums/review-type.enum';

export interface ReviewResponse {
	description: string;
	grade: number;
	postedAt: string;
	reviewType: ReviewType;
	reviewSubjectId: number;
}
