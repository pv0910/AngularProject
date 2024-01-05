import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = 'http://localhost:3000/resources';

  constructor(private http: HttpClient) {}

  getLibraryResources(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}