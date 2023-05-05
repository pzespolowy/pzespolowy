import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewType } from 'src/app/interfaces/enums/review-type.enum';

@Component({
	selector: 'mw-podium-item',
	templateUrl: './podium-item.component.html',
})
export class PodiumItemComponent implements OnInit {
	@Input()
	coverLink!: string;

	@Input()
	position!: number;

	@Input()
	rate!: number;

	@Input()
	title!: string;

	@Input()
	id!: string;

	@Input()
	reviewType!: ReviewType;

	positionClass = '';

	private postionClasses = {
		'1': 'gold',
		'2': 'silver',
		'3': 'bronze',
	};

	constructor(private router: Router) {}

	ngOnInit(): void {
		const key = `${this.position}`;
		this.positionClass =
			this.postionClasses[key as keyof typeof this.postionClasses];
	}

	navigateToDetails() {
		const routerDetailLink =
			this.reviewType === ReviewType.TRACK ? 'details' : 'albumdetails';
		this.router.navigate([`/musicweb/home/${routerDetailLink}/${this.id}`]);
	}
}
