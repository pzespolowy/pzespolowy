import { Component, ElementRef, OnInit } from '@angular/core';
import { of, timer, concatMap } from 'rxjs';

@Component({
	selector: 'mw-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

	ngOnInit(): void {
		this.isOpen = true;
		
		setTimeout(this.hidebar.bind(this), 1);
	}

	hidebar() {
		this.isOpen = false;
	 }
	  
	title = 'musicweb';
	isOpen = true;
}
