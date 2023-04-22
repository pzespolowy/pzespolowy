import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorStateStrategy } from 'src/shared/directives/match-error-strategy';

@Component({
	selector: 'mw-login',
	templateUrl: './login.component.html',
})
export class LoginComponent {
	matcher = new ErrorStateStrategy();

	loginForm = this.fb.nonNullable.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
	});

	error?: string;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private title: Title,
		private router: Router
	) {
		title.setTitle('Login to app');
	}

	login() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}
		this.authService
			.login({ ...this.loginForm.getRawValue() })
			.subscribe((response) => {
				if (response.status !== 200) {
					this.error = response.message;
				} else {
					this.authService.getUserInfo();
					this.router.navigate(['/musicweb/home']);
				}
			});
	}
}
