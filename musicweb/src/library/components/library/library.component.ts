import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forkJoin, BehaviorSubject } from 'rxjs';
import { Album } from 'src/app/interfaces/album.interface';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';
import { Track } from 'src/app/interfaces/track.interface';
import { LibraryService } from 'src/library/services/library.service';

@Component({
	selector: 'mw-library',
	templateUrl: './library.component.html',
})
export class LibraryComponent implements OnInit {
	searchForm = this.fb.group({
		category: ['TRACK'],
		categoryQuery: ['', Validators.required],
		artistName: [''],
	});

	isClearButtonVisible = false;
	isSearching = false;

	searchedQuery = 'TRACK';
	reviewType = ReviewType.TRACK;

	searchSubject$ = new BehaviorSubject<ReviewType>(ReviewType.TRACK);

	tracks: Track[] = [];
	albums: Album[] = [];

	constructor(
		private fb: FormBuilder,
		private libraryService: LibraryService
	) {}

	ngOnInit(): void {
		this.searchForm.valueChanges.subscribe(() => {
			this.isClearButtonVisible =
				Object.values(this.searchForm.getRawValue()).join('') !==
				this.searchedQuery;
		});

		this.search();
	}

	search() {
		if (this.searchForm.invalid) {
			return;
		}

		this.isSearching = true;
		this.isClearButtonVisible = false;
		this.searchedQuery = Object.values(this.searchForm.getRawValue()).join(
			''
		);

		if (this.reviewType === ReviewType.ALBUM) {
			this.libraryService
				.search(this.categoryQuery || '', this.reviewType)
				.subscribe((ranks) => {
					console.log(ranks);
					forkJoin(
						ranks.map((elem) =>
							this.libraryService.getAlbumDetails(elem.id)
						)
					).subscribe((searchResult) => {
						this.albums = searchResult;
						this.tracks = [];
						this.isSearching = false;
						console.log(searchResult);
					});
				});
		} else {
			this.libraryService
				.search(this.categoryQuery || '', this.reviewType)
				.subscribe((ranks) => {
					console.log(ranks);
					forkJoin(
						ranks.map((elem) =>
							this.libraryService.getTrackDetails(elem.id)
						)
					).subscribe((searchResult) => {
						this.tracks = searchResult;
						this.albums = [];
						this.isSearching = false;
						console.log(searchResult);
					});
				});
		}
	}

	clear() {
		this.searchForm.reset();
		this.searchForm.patchValue({ category: 'TRACK' });
		this.search();
	}

	get category() {
		return this.searchForm.controls.category.value || '';
	}

	get categoryQuery() {
		return this.searchForm.controls.categoryQuery.value;
	}

	get artistName() {
		return this.searchForm.controls.artistName.value;
	}
}
