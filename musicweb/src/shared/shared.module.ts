import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorNotificationComponent } from './components/error-notification/error-notification.component';
import { FirstUpperPipe } from './pipes/first-upper.pipe';
import { CustomSnackbarComponent } from './components/custom-snackbar/custom-snackbar.component';
import { CustomSnackbarService } from './services/custom-snackbar.service';
import { ReviewComponent } from './components/review/review.component';
import { RouterModule } from '@angular/router';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { ListItemComponent } from './components/list-item/list-item.component';

@NgModule({
	imports: [MatSnackBarModule, MatCardModule, CommonModule, RouterModule],
	declarations: [
		ErrorNotificationComponent,
		FirstUpperPipe,
		CustomSnackbarComponent,
		ReviewComponent,
		ClickStopPropagationDirective,
		ListItemComponent,
	],
	providers: [CustomSnackbarService],
	exports: [
		ErrorNotificationComponent,
		FirstUpperPipe,
		ReviewComponent,
		ClickStopPropagationDirective,
		ListItemComponent,
	],
})
export class SharedModule {}
