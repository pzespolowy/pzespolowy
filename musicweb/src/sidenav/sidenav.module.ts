import { NgModule } from '@angular/core';
import { SideNavComponent } from './componenets/side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideNavItemComponent } from './componenets/side-nav-item/side-nav-item.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
	declarations: [SideNavComponent, SideNavItemComponent],
	imports: [CommonModule, RouterModule, MatTooltipModule],
	providers: [],
	exports: [SideNavComponent],
})
export class SideNavModule {}
