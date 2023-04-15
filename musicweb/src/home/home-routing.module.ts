import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/components/home/home.component';
import { SongdetailsComponent } from 'src/details/components/songdetails/songdetails.component';

const routes: Routes = [
	{
		path: 'home',
		component: HomeComponent,
		children: [{ path: 'details/:id', component: SongdetailsComponent }],
	},
	{ path: '', redirectTo: '/musicweb/home', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomeRoutingModule {}
