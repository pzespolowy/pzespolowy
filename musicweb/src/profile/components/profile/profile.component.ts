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
import { SettingsService } from 'src/profile/services/settings.service';
import { UpdatedUserInfo } from 'src/app/interfaces/updatedUser-info.interface';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';
import { SaveallDialogComponent } from '../saveall-dialog/saveall-dialog.component';
import { UserInfo } from 'src/app/interfaces/user-info.interface';

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
  playerName? : string;
  playerSurname? : string;
  isNicknameActive = false;
  isNameActive = false;
  isSurnameActive = false;
  isPasswordActive = false;
	error?: string;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private title: Title,
    private dialog: MatDialog,
    private settingService: SettingsService,
    private snackBarService: CustomSnackbarService
	) { 
    
  }

  ngOnInit(): void {
    this.settingService.getUser().subscribe( x =>{
      this.playerNick = x?.nickname;
      this.playerName = x?.name;
      this.playerSurname = x?.surname;
    });
    this.nicknameForm.get('nickname')?.disable();
    this.nameForm.get('name')?.disable();
    this.surnameForm.get('surname')?.disable();
    this.passwordForm.get('password')?.disable();
    this.passwordForm.get('passwordRepeat')?.disable();
  }

  OnNameChange(accepted: boolean){
    if(accepted && this.nameForm.valid)
    {
      const updatedUserInfo : UpdatedUserInfo = {};
      updatedUserInfo.name = this.name?.getRawValue();
      this.settingService.update(updatedUserInfo).subscribe(
        x => {
            if(x.status === 200)
            {
              this.snackBarService.success(`Update completed!`, 'Name updated in database');
            }
            else
            {
                this.snackBarService.error(`Failed to update!:${x.data}`, 'Error during update operation');
            }
        });
    }
    this.isNameActive = false;
    this.nameForm.get('name')?.disable();
  }

  OnNameEdit(){
    this.isNameActive = true;
    this.nameForm.get('name')?.enable();
  }

  OnSurnameChange(accepted: boolean){
    if(accepted && this.surnameForm.valid)
    {
      const updatedUserInfo : UpdatedUserInfo = {};
      updatedUserInfo.surname = this.surname?.getRawValue();
      this.settingService.update(updatedUserInfo).subscribe(
        x => {
            if(x.status === 200)
            {
              this.snackBarService.success(`Update completed!`, 'Surname updated in database');
            }
            else
            {
                this.snackBarService.error(`Failed to update!:${x.data}`, 'Error during update operation');
            }
        });
    }
    this.isSurnameActive = false;
    this.surnameForm.get('surname')?.disable();
  }

  OnSurnameEdit(){
    this.isSurnameActive = true;
    this.surnameForm.get('surname')?.enable();
  }

  OnNicknameChange(accepted: boolean){
    if(accepted && this.nicknameForm.valid)
    {
      const updatedUserInfo : UpdatedUserInfo = {};
      updatedUserInfo.nickname = this.nickname?.getRawValue();
      this.settingService.update(updatedUserInfo).subscribe(
        x => {
            if(x.status === 200)
            {
              this.snackBarService.success(`Update completed!`, 'Nickname updated in database');
              this.playerName = this.nickname?.value;
            }
            else
            {
                this.snackBarService.error(`Failed to update!:${x.data}`, 'Error during update operation');
            }
        });
    }
    this.isNicknameActive = false;
    this.nicknameForm.get('nickname')?.disable();
  }

  OnNicknameEdit(){
    this.isNicknameActive = true;
    this.nicknameForm.get('nickname')?.enable();
  }

  OnPasswordChange(accepted: boolean){
    if(accepted && this.passwordForm.valid)
    {
      const updatedUserInfo : UpdatedUserInfo = {};
      updatedUserInfo.password = this.password?.getRawValue();
      this.settingService.update(updatedUserInfo).subscribe(
        x => {
            if(x.status === 200)
            {
              this.snackBarService.success(`Update completed!`, 'Password updated in database');
            }
            else
            {
                this.snackBarService.error(`Failed to update!:${x.data}`, 'Error during update operation');
            }
        });
    }
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

      dialogRef.afterClosed();
  }

  saveAllPopout(){
    const formsData : UpdatedUserInfo = {
      password: this.password?.value,
      nickname: this.nickname?.value,
      surname: this.surname?.value,
      name: this.name?.value
    };
    const updatedUserInfo = Object.fromEntries(Object.entries(formsData).filter(([_, v]) => !!v !== false));//remove invalid props
    
    if(this.isPasswordActive || this.isSurnameActive || this.isNicknameActive || this.isNameActive )//compare to object empty
    {
      const dialogRef = this.dialog.open(SaveallDialogComponent,{
        data:{
            message: 'Are you sure to save all editable rows?'
        }
        });
  
        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
          if(confirmed)
          {
              const updatedUserInfo : UpdatedUserInfo = {};
              if(this.isPasswordActive && this.passwordForm.valid)
              {
                updatedUserInfo.password = this.password?.value;
              }
              if(this.isSurnameActive && this.surnameForm.valid)
              {
                updatedUserInfo.surname = this.surname?.value;
              }
              if(this.isNameActive && this.nameForm.valid)
              {
                updatedUserInfo.name = this.name?.value;
              }
              if(this.isNicknameActive && this.nicknameForm.valid)
              {
                updatedUserInfo.nickname = this.nickname?.value;
              }
              this.settingService.update(updatedUserInfo).subscribe(
              x => {
                  if(x.status === 200)
                  {
                    this.snackBarService.success(`Update completed!`, 'Data updated in database');
                    if(this.isNicknameActive)
                    {
                      this.playerName = this.nickname?.value;
                    }
                  }
                  else
                  {
                      this.snackBarService.error(`Failed to update!:${x.data}`, 'Error during update operation');
                  }
              });
          }
        });
    }
   
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

	get passwordRepeat() {
		return this.passwordForm.get('passwordRepeat');
	}
}
