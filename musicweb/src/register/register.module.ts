import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';

@NgModule({
	declarations: [RegisterComponent],
	imports: [
		RegisterRoutingModule,
		CommonModule,
		MatInputModule,
		MatButtonModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatCardModule,
		SharedModule,
	],
	exports: [RegisterComponent],
})
export class RegisterModule {}
