import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public apiUrl = 'http://localhost:3000/courses'; 

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTotalCourses(courses: any[]): number {
    return courses.length;
  }

  getTotalFreeCourses(courses: any[]): number {
    return courses.filter((course) => course.type === 'Free').length;
  }

  getTotalPremiumCourses(courses: any[]): number {
    return courses.filter((course) => course.type === 'Premium').length;
  }

  addCourse(newCourse: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newCourse);
  }

  removeCourse(courseId: number): Observable<any> {
    const url = `${this.apiUrl}/${courseId}`;
    return this.http.delete(url);
  }
 
}
