import { Component, HostListener, OnInit } from '@angular/core';

@Component({
	selector: 'mw-home',
	templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
	isOpen = true;
	isMobile = false;

	ngOnInit(): void {
		this.isOpen = true;
		this.isMobile = window.innerWidth < 650;
		setTimeout(this.hidebar.bind(this), 1);
	}

	hidebar() {
		this.isOpen = false;
	}

	@HostListener('window:resize', ['$event'])
	onWindowResize() {
		this.isMobile = window.innerWidth < 650;
	}
}
