import { Review } from './review.interface';

export interface MyReview extends Omit<Review, 'user'> {
	title: string;
}
