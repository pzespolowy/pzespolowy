import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewsTabComponent } from './reviews-tab/reviews-tab.component';

const routes: Routes = [
	{ path: '', component: ReviewsTabComponent, title: 'My reviews' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ReviewsRoutingModule {}
