import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AlbumResponse } from 'src/app/interfaces/album-response.interface';
import { Album } from 'src/app/interfaces/album.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumDetailsService {

  apiPath = environment.apiPath;
  
	constructor(private http: HttpClient) {}

	getAlbumDetails(id: string): Observable<Album> {
		return this.http.get<AlbumResponse>(`${this.apiPath}/album/${id}`).pipe(
			map((data) => {
        console.log(data);
        let album! : Album;
        return album;
			})
		);
	}
}
