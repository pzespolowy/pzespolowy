import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { UpdatedUserInfo } from 'src/app/interfaces/updatedUser-info.interface';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { environment } from 'src/environments/environment';
import { Response } from 'src/shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  apiPath = environment.apiPath;

  constructor(private http: HttpClient) {  }

  getUser() : Observable<UserInfo>{
    return this.http.get(`${this.apiPath}/users/currentuser`);
  }

  delete() : Observable<Response<string>>
  {
    return this.http.delete(`${this.apiPath}/users/currentuser`).pipe(
      map((_x) => {
        return { status: 200, data: 'OK' };
      }),
      catchError((x: HttpErrorResponse) => {
        return of({ status: 400, data: `${x.error.detail}` });
      })
    );
  }

  update(updatedUserInfo : UpdatedUserInfo): Observable<Response<string>>
  {
    return this.http.put(`${this.apiPath}/users/currentuser`, updatedUserInfo).pipe(
      map((_x) => {
        return { status: 200, data: 'OK' };
      }),
      catchError((x: HttpErrorResponse) => {
        return of({ status: 400, data: `${x.error.detail}` });
      })
    );
  }
}
