import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginDto } from '../models/loginDto.interface';
import { afterLoginDto } from '../models/afterLoginDto.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public loginpost(user : loginDto) : Observable<afterLoginDto>{
    return this.http.post<afterLoginDto>('http://localhost:8080/api/login', user);
  }
}
