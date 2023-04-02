import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from 'src/home/home.module';

const routes: Routes = [
	{
		path: 'musicweb',
		loadChildren: () => HomeModule,
	},
	{
		path: 'register',
		loadChildren: () =>
			import('../register/register.module').then(
				(mod) => mod.RegisterModule
			),
	},
	{ path: '', redirectTo: 'musicweb', pathMatch: 'full' },
	{
		path: '**',
		loadComponent: () =>
			import('./components/not-found/not-found.component').then(
				(m) => m.NotFoundComponent
			),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
