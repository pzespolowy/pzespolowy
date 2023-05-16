import { Component, Input } from '@angular/core';
import { FavouriteData } from '../../interfaces/favourite-data.interface';
import { FavouriteService } from 'src/shared/services/favourite.service';
import { Router } from '@angular/router';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';

@Component({
	selector: 'mw-fav-tile',
	templateUrl: './fav-tile.component.html',
})
export class FavTileComponent {
	isFavourite = true;
	@Input()
	favouriteItem!: FavouriteData;

	constructor(
		private favouriteService: FavouriteService,
		private router: Router,
		private snackbarService: CustomSnackbarService
	) {}

	handleFavChange() {
		if (this.isFavourite) {
			this.deleteFromFav();
		} else {
			this.addToFav();
		}
	}

	goToDetails() {
		const routerDetailLink =
			this.favouriteItem.reviewType === ReviewType.TRACK
				? 'details'
				: 'albumdetails';
		this.router.navigate([
			`/musicweb/home/${routerDetailLink}/${this.favouriteItem.id}`,
		]);
	}

	private addToFav() {
		this.favouriteService
			.postFavourite(this.favouriteItem.id, this.favouriteItem.reviewType)
			.subscribe((x) => {
				if (x.status === 200) {
					this.snackbarService.success(
						`Succefully added  ${this.favouriteItem.reviewType.toLowerCase()} ${
							this.favouriteItem.title
						} to favourites`,
						x.data
					);
					this.isFavourite = true;
				} else {
					this.snackbarService.error(
						`Cannot add  ${this.favouriteItem.reviewType.toLowerCase()} ${
							this.favouriteItem.title
						} to favourites`,
						x.data
					);
				}
			});
	}

	private deleteFromFav() {
		this.favouriteService
			.deleteFavourite(
				this.favouriteItem.id,
				this.favouriteItem.reviewType
			)
			.subscribe((x) => {
				if (x.status === 200) {
					this.snackbarService.success(
						`Succefully removed ${this.favouriteItem.reviewType.toLowerCase()} ${
							this.favouriteItem.title
						} from favourites`,
						x.data
					);
					this.isFavourite = false;
				} else {
					this.snackbarService.error(
						`Cannot remove  ${this.favouriteItem.reviewType.toLowerCase()} ${
							this.favouriteItem.title
						} from favourites`,
						x.data
					);
				}
			});
	}
}
