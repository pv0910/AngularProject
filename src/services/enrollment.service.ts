import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  public apiUrl = 'http://localhost:3000/enrollments';

  constructor(private http: HttpClient) {}

  public enroll(courseId: number, userId: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { courseId, userId });
  }

  public unenroll(enrollmentId: number, userId: string): Observable<any> {
    const url = `${this.apiUrl}/${enrollmentId}?userId=${userId}`;
    return this.http.delete<any>(url);
  }

  public getEnrollments(userId: string): Observable<any[]> {
    const url = `${this.apiUrl}?userId=${userId}`;
    return this.http.get<any[]>(url);
  }

  public deleteEnrollment(enrollmentId: number, userId: string): Observable<any> {
    const url = `${this.apiUrl}/${enrollmentId}?userId=${userId}`;
    return this.http.delete<any>(url);
  }
}
