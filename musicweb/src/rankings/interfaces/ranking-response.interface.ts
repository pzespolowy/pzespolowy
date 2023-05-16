import { ReviewResponse } from 'src/app/interfaces/review-response.interface';

export interface RankingResponse {
	reviews: ReviewResponse[];
	ranking: number;
	id: string;
}
