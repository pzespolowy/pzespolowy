import { Route, RouterModule } from '@angular/router';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { NgModule } from '@angular/core';

const routes: Route[] = [
	{ path: '', component: FavouritesComponent, title: 'Favourites' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class FavouritesRoutingModule {}
