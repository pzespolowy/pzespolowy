import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { SideNavModule } from 'src/sidenav/sidenav.module';
import { SearchModule } from 'src/search/search.module';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './components/header/header.component';
import { HomeRoutingModule } from './home-routing.module';
import { DetailsModule } from 'src/details/details.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
	declarations: [HomeComponent, HeaderComponent, HomepageComponent],
	imports: [
		HomeRoutingModule,
		SideNavModule,
		SearchModule,
		CommonModule,
		MatSidenavModule,
		DetailsModule,
		MatProgressSpinnerModule,
		SharedModule,
	],
	providers: [],
})
export class HomeModule {}
