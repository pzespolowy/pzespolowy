import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { FavouriteService } from 'src/shared/services/favourite.service';
import { FavouriteData } from '../../interfaces/favourite-data.interface';

@Component({
	selector: 'mw-favourites',
	templateUrl: './favourites.component.html',
})
export class FavouritesComponent implements OnInit {
	favourites$?: Observable<FavouriteData[]>;
	constructor(private favouriteService: FavouriteService) {}

	ngOnInit(): void {
		this.favouriteService.getFavourites().subscribe((favs) => {
			this.favourites$ = forkJoin(
				favs.map((fav) =>
					this.favouriteService.getProperFavDetails(
						fav.id,
						fav.reviewType
					)
				)
			);
		});
	}
}
