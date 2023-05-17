import { NgModule } from '@angular/core';
import { RankingComponent } from './components/ranking/ranking.component';
import { SharedModule } from 'src/shared/shared.module';
import { CommonModule } from '@angular/common';
import { RankingsRoutingModule } from './rankings-routing.module';
import { PodiumItemComponent } from './components/podium-item/podium-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
	declarations: [RankingComponent, PodiumItemComponent],
	imports: [
		SharedModule,
		CommonModule,
		RankingsRoutingModule,
		MatProgressSpinnerModule,
	],
	exports: [],
})
export class RankingModule {}
