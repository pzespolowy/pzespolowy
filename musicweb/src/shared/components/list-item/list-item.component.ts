import { Component, Input } from '@angular/core';

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
}
