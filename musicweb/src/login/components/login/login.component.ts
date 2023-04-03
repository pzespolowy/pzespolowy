import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { LoginService } from 'src/login/services/login.service';
import { ErrorStateStrategy } from 'src/shared/directives/match-error-strategy';

@Component({
	selector: 'mw-login',
	templateUrl: './login.component.html',
})
export class LoginComponent {
	matcher = new ErrorStateStrategy();

	loginForm = this.fb.nonNullable.group({
		login: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
	});

	error?: string;

	constructor(
		private fb: FormBuilder,
		private loginService: LoginService,
		private title: Title
	) {
		title.setTitle('Login to app');
	}

	login() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}
		this.loginService
			.login({ ...this.loginForm.getRawValue() })
			.subscribe((response) => {
				if (response.status === 200) {
					//open snackbar
				} else {
					this.error = response.message;
				}
			});
	}
}
