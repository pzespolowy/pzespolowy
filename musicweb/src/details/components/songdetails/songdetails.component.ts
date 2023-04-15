import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { TrackDetailsService } from 'src/details/services/track-details.service';

@Component({
	selector: 'mw-songdetails',
	templateUrl: './songdetails.component.html',
	styleUrls: ['./songdetails.component.scss'],
})
export class SongdetailsComponent implements OnInit {
	track$: Observable<any> = new Observable();

	constructor(
		private trackDetailsService: TrackDetailsService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.track$ = this.route.paramMap.pipe(
			switchMap((params: ParamMap) => {
				const id = params.get('id');
				return this.trackDetailsService.getDetails(id ?? '');
			})
		);
	}
}
