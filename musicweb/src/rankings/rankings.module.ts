import { NgModule } from '@angular/core';
import { RankingComponent } from './components/ranking/ranking.component';
import { SharedModule } from 'src/shared/shared.module';
import { CommonModule } from '@angular/common';
import { RankingsRoutingModule } from './rankings-routing.module';
import { PodiumItemComponent } from './components/podium-item/podium-item.component';

@NgModule({
	declarations: [RankingComponent, PodiumItemComponent],
	imports: [SharedModule, CommonModule, RankingsRoutingModule],
	exports: [],
})
export class RankingModule {}
