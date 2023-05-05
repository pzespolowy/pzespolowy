import { Artist } from 'src/app/interfaces/artist.interface';
import { ReviewResponse } from 'src/app/interfaces/review-response.interface';

export interface RankingData {
	reviews: ReviewResponse[];
	ranking: number;
	id: string;
	title: string;
	artist: Artist;
	coverLink: string;
	genre?: string;
}
