import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './components/profile/profile.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteAccountDialogComponent } from './components/delete-account-dialog/delete-account-dialog.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SaveallDialogComponent } from './components/saveall-dialog/saveall-dialog.component';

@NgModule({
	declarations: [ProfileComponent, DeleteAccountDialogComponent, SaveallDialogComponent],
	imports: [
		CommonModule,
		MatInputModule,
		MatButtonModule,
		ReactiveFormsModule.withConfig({
			callSetDisabledState: 'whenDisabledForLegacyCode',
		}),
		MatSelectModule,
		MatCardModule,
		SharedModule,
		MatFormFieldModule,
		MatDialogModule,
		ProfileRoutingModule,
	],
	providers: [],
	exports: [ProfileComponent, DeleteAccountDialogComponent],
})
export class ProfileModule {}
