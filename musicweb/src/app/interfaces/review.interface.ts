import { ReviewType } from './enums/review-type.enum';
import { UserInfo } from './user-info.interface';

export interface Review {
	id: number;
	grade: number;
	reviewType: ReviewType;
	description?: string;
	postedAt?: string;
	user?: UserInfo;
}
