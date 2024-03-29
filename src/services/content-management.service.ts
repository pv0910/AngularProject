import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentManagementService {
  public apiUrl = 'http://localhost:3000/content';

  constructor(private http: HttpClient) {}

  public createContent(contentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, contentData).pipe(
      catchError((error) => {
        console.error('Error creating content:', error);
        throw error;
      })
    );
  }
  public updateContent(contentId: string, updatedContent: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${contentId}`, updatedContent);
  }
  public getAllContent(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  public deleteContentById(contentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${contentId}`);
  }

  public getContentByCourseId(courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?courseId=${courseId}`);
  }
  public getContentDetails(contentId: number): Observable<any> {
    const url = `${this.apiUrl}/${contentId}`;
    return this.http.get<any>(url);
  }

}
