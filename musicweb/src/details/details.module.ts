import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextWithLabelComponent } from './components/text-with-label/text-with-label.component';
import { SongdetailsComponent } from './components/songdetails/songdetails.component';
import { DurationPipe } from './pipes/duration.pipe';
import { CoverSrcsetPipe } from './pipes/cover-srcset.pipe';
import { GradeComponent } from './components/grade/grade.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { AlbumdetailsComponent } from './components/albumdetails/albumdetails.component';
import { RouterModule } from '@angular/router';
import { ReviewComponent } from './components/review/review.component';

@NgModule({
	declarations: [
		TextWithLabelComponent,
		SongdetailsComponent,
		DurationPipe,
		CoverSrcsetPipe,
		GradeComponent,
		AlbumdetailsComponent,
		ReviewComponent,
	],
	imports: [
		CommonModule,
		MatTooltipModule,
		ReactiveFormsModule,
		RouterModule,
	],
	exports: [SongdetailsComponent],
})
export class DetailsModule {}
