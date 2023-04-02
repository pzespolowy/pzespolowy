import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateStrategy } from 'src/shared/directives/match-error-strategy';

@Component({
  selector: 'mw-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

matcher = new ErrorStateStrategy();

loginForm = this.fb.group({
    login: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
});

constructor( private fb : FormBuilder){}

login(){
  if(this.loginForm.invalid) 
  {
    this.loginForm.markAllAsTouched();
    return;
  }
}

}
