import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Album } from 'src/app/interfaces/album.interface';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { AuthService } from 'src/app/services/auth.service';
import { AlbumDetailsService } from 'src/details/services/album-details.service';

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
		private authService: AuthService
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
}
