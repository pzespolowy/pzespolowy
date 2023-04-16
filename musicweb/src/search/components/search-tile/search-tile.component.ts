import { Component, Input } from '@angular/core';
import { SearchData } from 'src/search/interfaces/search-data.interface';

@Component({
	selector: 'mw-search-tile',
	templateUrl: './search-tile.component.html',
	styleUrls: ['./search-tile.component.scss'],
})
export class SearchTileComponent {
	@Input()
	searchData!: SearchData;
}
