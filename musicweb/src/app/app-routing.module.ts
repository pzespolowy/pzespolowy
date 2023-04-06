import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from 'src/home/home.module';
import { authCantMatch } from './guards/authCantMatch.guard';

const routes: Routes = [
	{
		path: 'musicweb',
		loadChildren: () => HomeModule,
	},
	{ path: '', redirectTo: 'musicweb', pathMatch: 'full' },
	{
		path: 'register',
		loadChildren: () =>
			import('../register/register.module').then(
				(mod) => mod.RegisterModule
			),
	},
	{
		path: 'login',
		loadChildren: () =>
			import('../login/login.module').then((m) => m.LoginModule),
		canMatch: [authCantMatch],
	},
	{
		path: '**',
		loadComponent: () =>
			import('./components/not-found/not-found.component').then(
				(m) => m.NotFoundComponent
			),
		canMatch: [authCantMatch],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
