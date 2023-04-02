import { NgModule } from '@angular/core';
import { SideNavComponent } from './componenets/side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideNavItemComponent } from './componenets/side-nav-item/side-nav-item.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TopNavComponent } from './componenets/top-nav/top-nav.component';

@NgModule({
	declarations: [SideNavComponent, SideNavItemComponent, TopNavComponent],
	imports: [CommonModule, RouterModule, MatTooltipModule],
	providers: [],
	exports: [SideNavComponent, TopNavComponent],
})
export class SideNavModule {}
