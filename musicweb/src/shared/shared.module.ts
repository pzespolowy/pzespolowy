import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorNotificationComponent } from './components/error-notification/error-notification.component';
import { FirstUpperPipe } from './pipes/first-upper.pipe';

@NgModule({
	imports: [MatSnackBarModule, MatCardModule, CommonModule],
	declarations: [ErrorNotificationComponent, FirstUpperPipe],
	exports: [ErrorNotificationComponent, FirstUpperPipe],
})
export class SharedModule {}
