import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorNotificationComponent } from './components/error-notification/error-notification.component';
import { FirstUpperPipe } from './pipes/first-upper.pipe';
import { CustomSnackbarComponent } from './components/custom-snackbar/custom-snackbar.component';
import { CustomSnackbarService } from './services/custom-snackbar.service';

@NgModule({
	imports: [MatSnackBarModule, MatCardModule, CommonModule],
	declarations: [
		ErrorNotificationComponent,
		FirstUpperPipe,
		CustomSnackbarComponent,
	],
	providers: [CustomSnackbarService],
	exports: [ErrorNotificationComponent, FirstUpperPipe],
})
export class SharedModule {}
