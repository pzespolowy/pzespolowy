import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/profile/services/settings.service';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';

@Component({
  selector: 'mw-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.scss']
})
export class DeleteAccountDialogComponent {
    message = "Are you sure want to delete?"
    confirmButtonText = "Yes"
    cancelButtonText = "Cancel"
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any, 
    private dialogRef: MatDialogRef<DeleteAccountDialogComponent>, 
    private settingsService : SettingsService, 
    private authService : AuthService, 
    private snackBarService : CustomSnackbarService) {
        if(data){
            this.message = data.message || this.message;
            if (data.buttonText) {
                this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
        }
    }
 
    onConfirmClick(): void {
        this.settingsService.delete().subscribe(
            x => {
                if(x.status === 200)
                {
                    this.authService.logout();
                }
                else
                {
                    this.snackBarService.error(`Failed to delete account!:${x.data}`, 'Error during delete operation');
                }
            });
        this.dialogRef.close(true);
    }
}
