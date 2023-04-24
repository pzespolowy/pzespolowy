import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextWithLabelComponent } from './components/text-with-label/text-with-label.component';
import { SongdetailsComponent } from './components/songdetails/songdetails.component';
import { DurationPipe } from './pipes/duration.pipe';
import { CoverSrcsetPipe } from './pipes/cover-srcset.pipe';
import { AlbumdetailsComponent } from './components/albumdetails/albumdetails.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [TextWithLabelComponent, SongdetailsComponent, DurationPipe, CoverSrcsetPipe, AlbumdetailsComponent],
	imports: [CommonModule, RouterModule],
	exports: [SongdetailsComponent],
})
export class DetailsModule {}
