import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/components/home/home.component';
import { SongdetailsComponent } from 'src/details/components/songdetails/songdetails.component';
import { AlbumdetailsComponent } from 'src/details/components/albumdetails/albumdetails.component';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
		children: [
			{ path: 'details/:id', component: SongdetailsComponent },
			{ path: 'albumdetails/:id', component: AlbumdetailsComponent },
			{
				path: 'setting',
				loadChildren: () =>
					import('../profile/profile.module').then(
						(m) => m.ProfileModule
					),
			},
			{
				path: 'reviews',
				loadChildren: () =>
					import('./reviews-module/reviews.module').then(
						(m) => m.ReviewsModule
					),
				canMatch: [authGuard],
			},
			{
				path: 'favourite',
				loadChildren: () =>
					import('./favourites-module/favourties.module').then(
						(m) => m.FavouritesModule
					),
				canMatch: [authGuard],
			},
			{
				path: 'ranking',
				loadChildren: () =>
					import('../rankings/rankings.module').then(
						(m) => m.RankingModule
					),
			},
		],
		title: 'Homepage',
	},
	{ path: '', redirectTo: '/musicweb/home', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomeRoutingModule {}
