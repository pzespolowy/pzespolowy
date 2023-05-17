import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';

@Component({
	selector: 'mw-list-item',
	templateUrl: './list-item.component.html',
})
export class ListItemComponent {
	@Input()
	rank?: number;
	@Input()
	rating?: number;
	@Input()
	title?: string;
	@Input()
	opinionsCount?: number;
	@Input()
	genre?: string;
	@Input()
	coverLink?: string;
	@Input()
	reviewType!: ReviewType;
	@Input()
	id!: string;

	constructor(private router: Router) {}

	navigateToDetails() {
		const routerDetailLink =
			this.reviewType === ReviewType.TRACK ? 'details' : 'albumdetails';
		this.router.navigate([`/musicweb/home/${routerDetailLink}/${this.id}`]);
	}
}
