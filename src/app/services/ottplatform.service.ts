import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OttPlatform } from './plans';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OttplatformService {

  private apiUrl = 'http://localhost:8080/api/ottplatforms/all';

  constructor(private http: HttpClient) {}

  getAllOttPlatforms(): Observable<OttPlatform[]> {
    return this.http.get<OttPlatform[]>(this.apiUrl);
  }
}
