import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { Track } from 'src/app/interfaces/track.interface';
import { AuthService } from 'src/app/services/auth.service';
import { TrackDetailsService } from 'src/details/services/track-details.service';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';
import { FavouriteService } from 'src/shared/services/favourite.service';

@Component({
	selector: 'mw-songdetails',
	templateUrl: './songdetails.component.html',
})
export class SongdetailsComponent implements OnInit {
	track$: Observable<Track> = new Observable();
	track!: Track;
	isReviewBoxOpen = false;
	@ViewChild('audioTrack') audioPlayerRef: ElementRef | undefined;
	reviewType = ReviewType;
	isAuth = false;
	grade!: number;

	constructor(
		private trackDetailsService: TrackDetailsService,
		private route: ActivatedRoute,
		private title: Title,
		private authService: AuthService,
		private favouriteService: FavouriteService,
		private snackbarService: CustomSnackbarService
	) {}

	ngOnInit() {
		this.track$ = this.route.paramMap.pipe(
			switchMap((params: ParamMap) => {
				const id = params.get('id');
				return this.trackDetailsService.getTrackDetails(id ?? '');
			})
		);
		this.track$.subscribe((x) => {
			this.track = x;
			this.grade = this.track.rates?.currentUserGrade || 0;
			this.title.setTitle(this.track.title);
			this.closeReview();
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
			.postFavourite(this.track.id, ReviewType.TRACK)
			.subscribe((x) => {
				if (x.status === 200) {
					this.snackbarService.success(
						`Succefully added track ${this.track.title} to favourites`,
						x.data
					);
				} else {
					this.snackbarService.error(
						`Cannot add track ${this.track.title} to favourites`,
						x.data
					);
				}
			});
	}

	deleteFromFav() {
		this.favouriteService
			.deleteFavourite(this.track.id, ReviewType.TRACK)
			.subscribe((x) => {
				if (x.status === 200) {
					this.snackbarService.success(
						`Succefully removed track ${this.track.title} from favourites`,
						x.data
					);
				} else {
					this.snackbarService.error(
						`Cannot remove track ${this.track.title} from favourites`,
						x.data
					);
				}
			});
	}

	handleFavChange() {
		// TODO: check if track is favourite
		// eslint-disable-next-line no-constant-condition
		if (!false) {
			this.addToFav();
		} else {
			this.deleteFromFav();
		}
	}
}
