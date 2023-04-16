import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';
import { ErrorStateStrategy } from 'src/shared/directives/match-error-strategy';
import { WatchRepeatPasswordErrorStrategy } from 'src/register/directives/watch-form-error-strategy';
import { matchPasswordValidator } from 'src/register/directives/match-password-validator.directive';
import { passwordValidator } from 'src/register/directives/password-validator.directive';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'mw-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
 
  passwordForm = this.fb.nonNullable.group(
		{
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

  surnameForm = this.fb.nonNullable.group(
		{
			surname: ['', Validators.required],
		}
	);

  emailForm = this.fb.nonNullable.group(
		{
			email: ['', [Validators.required, Validators.email]]
    }
	);

  nameForm = this.fb.nonNullable.group(
		{
			name: ['', Validators.required]
    }
	);

  nicknameForm = this.fb.nonNullable.group(
		{
			nickname: ['', Validators.required]
    }
	);

	matcher = new ErrorStateStrategy();
	watchMatcher = new WatchRepeatPasswordErrorStrategy();
  playerNick? : string;
  isNicknameActive = false;
  isNameActive = false;
  isSurnameActive = false;
  isEmailActive = false;
  isPasswordActive = false;

	error?: string;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private title: Title,
    private dialog: MatDialog
	) { }

  ngOnInit(): void {
    this.playerNick = 'test';
    this.nicknameForm.get('nickname')?.disable();
    this.emailForm.get('email')?.disable();
    this.nameForm.get('name')?.disable();
    this.surnameForm.get('surname')?.disable();
    this.passwordForm.get('password')?.disable();
    this.passwordForm.get('passwordRepeat')?.disable();
  }

  OnEmailChange(accepted: boolean){
    this.isEmailActive = false;
    this.emailForm.get('email')?.disable();
  }

  OnEmailEdit(){
    this.isEmailActive = true;
    this.emailForm.get('email')?.enable();
  }

  OnNameChange(accepted: boolean){
    this.isNameActive = false;
    this.nameForm.get('name')?.disable();
  }

  OnNameEdit(){
    this.isNameActive = true;
    this.nameForm.get('name')?.enable();
  }

  OnSurnameChange(accepted: boolean){
    this.isSurnameActive = false;
    this.surnameForm.get('surname')?.disable();
  }

  OnSurnameEdit(){
    this.isSurnameActive = true;
    this.surnameForm.get('surname')?.enable();
  }

  OnNicknameChange(accepted: boolean){
    this.isNicknameActive = false;
    this.nicknameForm.get('nickname')?.disable();
  }

  OnNicknameEdit(){
    this.isNicknameActive = true;
    this.nicknameForm.get('nickname')?.enable();
  }

  OnPasswordChange(accepted: boolean){
    this.isPasswordActive = false;
    this.passwordForm.get('password')?.disable();
    this.passwordForm.get('passwordRepeat')?.disable();
  }

  OnPasswordEdit(){
    this.isPasswordActive = true;
    this.passwordForm.get('password')?.enable();
    this.passwordForm.get('passwordRepeat')?.enable();
  }

  deletePopout(){
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent,{
      data:{
          message: 'Are you sure to delete account?'
      }
      });

      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          console.log('delete');//TODO:delete user
        }
    });
  }

  get password() {
		return this.passwordForm.get('password');
	}

	get surname() {
		return this.surnameForm.get('surname');
	}

	get name() {
		return this.nameForm.get('name');
	}

	get nickname() {
		return this.nicknameForm.get('nickname');
	}

	get email() {
		return this.emailForm.get('email');
	}

	get passwordRepeat() {
		return this.passwordForm.get('passwordRepeat');
	}
}
