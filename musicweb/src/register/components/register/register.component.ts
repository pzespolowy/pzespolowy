import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { matchPasswordValidator } from 'src/register/directives/match-password-validator.directive';
import { passwordValidator } from 'src/register/directives/password-validator.directive';
import { WatchRepeatPasswordErrorStrategy } from 'src/register/directives/watch-form-error-strategy';
import { ErrorStateStrategy } from 'src/shared/directives/match-error-strategy';

@Component({
	selector: 'mw-register',
	templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
	registerForm = this.fb.nonNullable.group(
		{
			email: ['', [Validators.required, Validators.email]],
			nickname: ['', Validators.required],
			name: ['', Validators.required],
			surname: ['', Validators.required],
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(8),
					passwordValidator(),
				],
			],
			passwordRepeat: ['', [Validators.required]],
		},
		{ validators: matchPasswordValidator }
	);

	matcher = new ErrorStateStrategy();
	watchMatcher = new WatchRepeatPasswordErrorStrategy();

	error?: string;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private title: Title
	) {}

	ngOnInit(): void {
		this.title.setTitle('Regsiter to musicWeb');
	}

	singUp() {
		if (this.registerForm.invalid) {
			this.registerForm.markAllAsTouched();
			return;
		}
		const { passwordRepeat, ...registerData } = {
			...this.registerForm.getRawValue(),
		};
		this.authService.register(registerData).subscribe((response) => {
			if (response.status !== 201) {
				//open snackbar
			} else {
				this.error = response.message;
			}
		});
	}

	get password() {
		return this.registerForm.get('password');
	}

	get phone() {
		return this.registerForm.get('phone');
	}

	get phonePrefix() {
		return this.registerForm.get('phonePrefix');
	}

	get surname() {
		return this.registerForm.get('surname');
	}

	get name() {
		return this.registerForm.get('name');
	}

	get nickname() {
		return this.registerForm.get('nickname');
	}

	get email() {
		return this.registerForm.get('email');
	}

	get passwordRepeat() {
		return this.registerForm.get('passwordRepeat');
	}
}
