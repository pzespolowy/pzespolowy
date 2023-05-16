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
	sendedReview?: ReviewType;

	tracks: Track[] = [];
	defaultTracks: Track[] = [];
	albums: Album[] = [];
	defaultAlbums: Album[] = [];

	propKeysMap: { [key: string]: string } = {
		year: 'releaseData',
		duration: 'duration',
		rates: 'rates.averageRanking',
		opinions: 'rates.reviews.length',
	};

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
		if (this.searchForm.invalid || this.isSearching) {
			return;
		}

		this.isSearching = true;
		this.isClearButtonVisible = false;
		this.searchedQuery = Object.values(this.searchForm.getRawValue()).join(
			''
		);

		if (this.category === this.sendedReview) {
			this.filterData();
			this.isSearching = false;
			return;
		}

		this.sendedReview =
			this.category === ReviewType.ALBUM
				? ReviewType.ALBUM
				: ReviewType.TRACK;

		if (this.category === ReviewType.ALBUM) {
			this.libraryService
				.search(this.categoryQuery || '', this.sendedReview)
				.subscribe((ranks) => {
					forkJoin(
						ranks.map((elem) =>
							this.libraryService.getAlbumDetails(elem.id)
						)
					).subscribe((searchResult) => {
						this.defaultAlbums = searchResult;
						this.defaultTracks = [];
						this.tracks = this.defaultTracks;
						this.isSearching = false;
						this.filterData();
					});
				});
		} else {
			this.libraryService
				.search(this.categoryQuery || '', this.sendedReview)
				.subscribe((ranks) => {
					forkJoin(
						ranks.map((elem) =>
							this.libraryService.getTrackDetails(elem.id)
						)
					).subscribe((searchResult) => {
						this.defaultTracks = searchResult;
						this.defaultAlbums = [];
						this.albums = this.defaultAlbums;
						this.isSearching = false;
						this.filterData();
					});
				});
		}
	}

	filterData() {
		if (this.sendedReview === ReviewType.ALBUM) {
			this.filterAlbums();
		} else {
			this.filterTracks();
		}
	}

	filterAlbums() {
		this.albums = this.defaultAlbums;
		Object.entries(this.searchForm.getRawValue()).forEach(
			([key, value]) => {
				if (!value) return;
				if (key.includes('To') || key.includes('From')) {
					this.albums = this.filterByRangeKey<Album>(
						key,
						value,
						this.albums
					);
				}
				if (key === 'artistName') {
					this.albums = this.albums.filter((elem) =>
						elem.artist.name
							.toLowerCase()
							.includes(value.trim().toLowerCase())
					);
				}
			}
		);
	}

	filterTracks() {
		this.tracks = this.defaultTracks;
		Object.entries(this.searchForm.getRawValue()).forEach(
			([key, value]) => {
				if (!value) return;
				if (key.includes('To') || key.includes('From')) {
					this.tracks = this.filterByRangeKey<Track>(
						key,
						value,
						this.tracks
					);
				}
				if (key === 'artistName') {
					this.tracks = this.tracks.filter((elem) =>
						elem.artist.name
							.toLowerCase()
							.includes(value.trim().toLowerCase())
					);
				}
			}
		);
	}

	filterByRangeKey<T>(key: string, value: string | number, array: T[]): T[] {
		type keys = keyof (typeof array)[0];
		const properKey = this.propKeysMap[key.split(/(To)|(From)/)[0]];

		const dateKey = properKey === this.propKeysMap['year'];

		if (key.includes('To')) {
			return array.filter((elem) => {
				let propValue = this.getValueByStringKey(elem, properKey);
				if (dateKey) {
					propValue = parseInt(propValue.split('-')[0]);
					value = parseInt(value.toString());
				}
				return propValue <= value;
			});
		}
		return array.filter((elem) => {
			let propValue = this.getValueByStringKey(elem, properKey);
			if (dateKey) {
				propValue = parseInt(propValue.split('-')[0]);
				value = parseInt(value.toString());
			}
			return propValue >= value;
		});
	}

	clear() {
		const query = this.categoryQuery;
		this.searchForm.reset();
		this.searchForm.patchValue({ category: 'TRACK', categoryQuery: query });
		this.isClearButtonVisible = false;
		this.albums = this.defaultAlbums;
		this.tracks = this.defaultTracks;
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

	getValueByStringKey(o: any, key: string) {
		const keys = key.split('.');
		return keys.reduce((acc, curr) => acc[curr], o);
	}
}
