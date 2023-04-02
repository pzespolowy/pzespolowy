import { NgModule } from '@angular/core';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [SearchComponent],
	imports: [ReactiveFormsModule, CommonModule],
	exports: [SearchComponent],
})
export class SearchModule {}
