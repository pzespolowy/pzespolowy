import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	standalone: true,
	imports: [CommonModule],
	selector: 'mw-not-found',
	templateUrl: './not-found.component.html',
})
export class NotFoundComponent {}
