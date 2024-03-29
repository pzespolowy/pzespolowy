import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, forkJoin, takeUntil } from 'rxjs';
import { Artist } from 'src/app/interfaces/artist.interface';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { RankingData } from 'src/rankings/interfaces/ranking-data.interface';
import { RankingService } from 'src/rankings/services/ranking.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
	selector: 'mw-ranking',
	templateUrl: './ranking.component.html',
})
export class RankingComponent implements OnInit, OnDestroy {
	destroyed = new Subject<void>();

	ranking: RankingData[] = [];

	rankingDefault: RankingData[] = [];

	artists: Artist[] = [];

	genres: string[] = [];

	isGenreDropdownDisabled = true;

	isArtistDropdownDisabled = true;

	isSearching = true;

	selectedType: ReviewType = ReviewType.TRACK;

	selectedType$: BehaviorSubject<ReviewType> =
		new BehaviorSubject<ReviewType>(ReviewType.TRACK);

	genreFilter?: string;

	artistFilter?: Artist;

	isMobile = false;

	constructor(
		private rankingService: RankingService,
		private responsive: BreakpointObserver
	) {}

	ngOnInit(): void {
		this.responsive
			.observe([Breakpoints.Handset])
			.pipe(takeUntil(this.destroyed))
			.subscribe((x) => {
				this.isMobile = x.matches;
			});

		this.rankingService
			.getRanking(this.selectedType$)
			.subscribe((ranks) => {
				this.isSearching = true;
				if (!ranks.length) {
					this.isSearching = false;
					this.ranking = [];
					this.rankingDefault = [];
				}
				forkJoin(
					ranks
						.slice(0, 20)
						.map((elem) =>
							this.rankingService.getProperDetails(
								elem,
								this.selectedType
							)
						)
				).subscribe((rnk) => {
					this.isSearching = false;
					this.ranking = rnk;
					this.rankingDefault = rnk;
					this.artists = rnk
						.map((elem) => elem.artist)
						.reduce((acc, curr) => {
							if (!acc.find((e) => e.id === curr.id)) {
								acc.push(curr);
							}
							return acc;
						}, new Array<Artist>());
					this.isArtistDropdownDisabled = !this.artists.length;
					if (this.selectedType === ReviewType.ALBUM) {
						this.genres = [
							...new Set(rnk.map((elem) => elem.genre || '')),
						];
						this.isGenreDropdownDisabled = !this.artists.length;
					}
				});
			});
	}

	ngOnDestroy() {
		this.destroyed.next();
		this.destroyed.complete();
	}

	changeSelectedType(reviewType: ReviewType) {
		this.isSearching = reviewType !== this.selectedType;
		this.selectedType = reviewType;
		this.isGenreDropdownDisabled = reviewType !== ReviewType.ALBUM;

		this.selectedType$.next(this.selectedType);
	}

	public get ReviewType() {
		return ReviewType;
	}

	filterRanking() {
		this.ranking = this.rankingDefault.filter(
			(elem) =>
				(!this.genreFilter || elem.genre === this.genreFilter) &&
				(!this.artistFilter || elem.artist.id === this.artistFilter.id)
		);
	}

	filterGenre(genre: string) {
		this.genreFilter = genre;
		this.filterRanking();
	}

	filterArtist(artist: Artist) {
		this.artistFilter = artist;
		this.filterRanking();
	}

	clearArtistFilter() {
		this.artistFilter = undefined;
		this.filterRanking();
	}

	clearGenreFilter() {
		this.genreFilter = undefined;
		this.filterRanking();
	}
}
