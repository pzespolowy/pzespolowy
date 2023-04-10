import { NgModule } from '@angular/core';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchTileComponent } from './components/search-tile/search-tile.component';
import { SharedModule } from 'src/shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
	declarations: [SearchComponent, SearchTileComponent],
	imports: [ReactiveFormsModule, CommonModule, SharedModule, ScrollingModule],
	exports: [SearchComponent],
})
export class SearchModule {}
