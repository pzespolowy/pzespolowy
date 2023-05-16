import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
		this.favourites$ = this.favouriteService.getFavourites();
	}
}
