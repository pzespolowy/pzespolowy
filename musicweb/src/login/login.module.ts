import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
	MatFormFieldControl,
	MatFormFieldModule,
} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		LoginRoutingModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		SharedModule,
	],
	exports: [],
})
export class LoginModule {}
