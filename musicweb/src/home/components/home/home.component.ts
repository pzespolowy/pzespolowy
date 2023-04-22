import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'mw-home',
	templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {
	isOpen = true;
	isMobile = false;

	@HostListener('window:resize', ['$event'])
	onWindowResize() {
		this.isMobile = window.innerWidth < 650;
	}

	constructor(private title: Title) {}

	ngOnInit(): void {
		this.title.setTitle('Homepage');
		this.isOpen = true;
		this.isMobile = window.innerWidth < 650;
	}

	ngAfterViewInit(): void {
		setTimeout(this.hidebar.bind(this), 150);
	}

	hidebar() {
		this.isOpen = false;
	}
}
