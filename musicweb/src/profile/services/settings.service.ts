import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  apiPath = environment.apiPath;

  constructor(private http: HttpClient) {  }

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
}
