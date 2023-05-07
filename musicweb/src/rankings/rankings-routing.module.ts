import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RankingComponent } from './components/ranking/ranking.component';

const routes: Route[] = [
	{ path: '', component: RankingComponent, title: 'Ranking' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RankingsRoutingModule {}
