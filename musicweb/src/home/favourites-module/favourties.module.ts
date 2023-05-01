import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { FavouritesRoutingModule } from './favoruties-routing.module';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { FavTileComponent } from './components/fav-tile/fav-tile.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	declarations: [FavouritesComponent, FavTileComponent],
	imports: [
		CommonModule,
		SharedModule,
		FavouritesRoutingModule,
		MatTooltipModule,
	],
	exports: [],
})
export class FavouritesModule {}
