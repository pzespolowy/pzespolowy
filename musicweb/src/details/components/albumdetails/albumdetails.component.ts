import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Album } from 'src/app/interfaces/album.interface';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { AuthService } from 'src/app/services/auth.service';
import { AlbumDetailsService } from 'src/details/services/album-details.service';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';
import { FavouriteService } from 'src/shared/services/favourite.service';

@Component({
	selector: 'mw-albumdetails',
	templateUrl: './albumdetails.component.html',
})
export class AlbumdetailsComponent implements OnInit {
	album$: Observable<Album> = new Observable();
	album!: Album;
	reviewType = ReviewType;
	isReviewBoxOpen = false;
	isAuth = false;
	grade!: number;

	constructor(
		private albumDetailsService: AlbumDetailsService,
		private route: ActivatedRoute,
		private title: Title,
		private authService: AuthService,
		private snackbarService: CustomSnackbarService,
		private favouriteService: FavouriteService
	) {}

	ngOnInit() {
		this.album$ = this.route.paramMap.pipe(
			switchMap((params: ParamMap) => {
				const id = params.get('id');
				return this.albumDetailsService.getAlbumDetails(id ?? '');
			})
		);
		this.album$.subscribe((x) => {
			this.album = x;
			this.closeReview();
			this.grade = this.album.rates?.currentUserGrade || 0;
			this.title.setTitle(this.album.title);
		});

		this.isAuth = this.authService.isAuth();
	}

	openCloseReview() {
		this.isReviewBoxOpen = !this.isReviewBoxOpen;
	}

	closeReview() {
		this.isReviewBoxOpen = false;
	}

	addToFav() {
		this.favouriteService
			.postFavourite(this.album.id, ReviewType.ALBUM)
			.subscribe((x) => {
				if (x.status === 200) {
					this.snackbarService.success(
						`Succefully added track ${this.album.title} to favourites`,
						x.data
					);
				} else {
					this.snackbarService.error(
						`Cannot add track ${this.album.title} to favourites`,
						x.data
					);
				}
			});
	}

	deleteFromFav() {
		this.favouriteService
			.deleteFavourite(this.album.id, ReviewType.ALBUM)
			.subscribe((x) => {
				if (x.status === 200) {
					this.snackbarService.success(
						`Succefully removed track ${this.album.title} from favourites`,
						x.data
					);
				} else {
					this.snackbarService.error(
						`Cannot add track ${this.album.title} to favourites`,
						x.data
					);
				}
			});
	}

	handleFavChange() {
		// TODO: check if ablsum is favourite
		// eslint-disable-next-line no-constant-condition
		if (!false) {
			this.addToFav();
		} else {
			this.deleteFromFav();
		}
	}
}
