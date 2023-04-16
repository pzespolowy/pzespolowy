import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { SideNavModule } from 'src/sidenav/sidenav.module';
import { SearchModule } from 'src/search/search.module';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './components/header/header.component';
import { HomeRoutingModule } from './home-routing.module';
import { DetailsModule } from 'src/details/details.module';

@NgModule({
	declarations: [HomeComponent, HeaderComponent],
	imports: [
		HomeRoutingModule,
		SideNavModule,
		SearchModule,
		CommonModule,
		MatSidenavModule,
		DetailsModule,
	],
	providers: [],
})
export class HomeModule {}
