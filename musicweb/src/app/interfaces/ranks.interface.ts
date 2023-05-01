import { Review } from './review.interface';

export interface Rank {
	averageRanking: number;
	reviews: Review[];
	currentUserGrade?: number;
}
