import { NgModule } from '@angular/core';
import { ReviewsTabComponent } from './reviews-tab/reviews-tab.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { ReviewsRoutingModule } from './reviews-routing.module';

@NgModule({
	declarations: [ReviewsTabComponent],
	imports: [CommonModule, SharedModule, ReviewsRoutingModule],
	exports: [],
})
export class ReviewsModule {}
