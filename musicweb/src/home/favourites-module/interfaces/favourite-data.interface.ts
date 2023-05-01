import { Artist } from 'src/app/interfaces/artist.interface';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';

export interface FavouriteData {
	id: string;
	title: string;
	artist: Artist;
	reviewType: ReviewType;
	coverLink: string;
}
