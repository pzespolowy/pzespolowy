import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextWithLabelComponent } from './components/text-with-label/text-with-label.component';
import { SongdetailsComponent } from './components/songdetails/songdetails.component';

@NgModule({
	declarations: [TextWithLabelComponent, SongdetailsComponent],
	imports: [CommonModule],
	exports: [SongdetailsComponent],
})
export class DetailsModule {}
