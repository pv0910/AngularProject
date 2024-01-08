import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from 'src/services/courses.service';
import { AddCourseComponent } from './add-course/add-course.component';
import { ToastrService } from 'ngx-toastr';
import { EnrollmentService } from 'src/services/enrollment.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  public courseCountRadioButton: string = 'All';
  public searchText: string = '';
  public courses: any[] = []; 
  public showAddCourseForm: boolean = false;
  public isadmin=false;
  public enrolledCourses: { [courseId: number]: boolean } = {};

  constructor(private courseService: CoursesService,
    private dialog: MatDialog,
    private enrollService: EnrollmentService,
    private toastr: ToastrService,) {
    let role=sessionStorage.getItem('role');
    if(role=='admin'){
      this.isadmin=true;
    }
    if(role=='instructor'){
      this.isadmin=true;
    }
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
    const userId = sessionStorage.getItem('username') || '';
    this.enrollService.getEnrollments(userId).subscribe((enrollments) => {
      enrollments.forEach((enrollment) => {
        this.enrolledCourses[enrollment.courseId] = true;
      });
    });
  }

  public getTotalCourses() {
    return this.courseService.getTotalCourses(this.courses);
  }

  public getTotalFreeCourses() {
    return this.courseService.getTotalFreeCourses(this.courses);
  }

  public getTotalPremiumCourses() {
    return this.courseService.getTotalPremiumCourses(this.courses);
  }

  public onFilterRadioButtonChanged(data: string) {
    this.courseCountRadioButton = data;
  }

  public onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }
  public toggleAddCourseForm() {
    this.showAddCourseForm = !this.showAddCourseForm;
  }
  public toggleEnrollment(courseId: number) {
    const userId = sessionStorage.getItem('username') || '';
    if (this.enrolledCourses[courseId]) {
      this.enrollService.getEnrollments(userId).subscribe((enrollments) => {
        const enrollment = enrollments.find((e) => e.courseId === courseId);
        if (enrollment) {
          const enrollmentId = enrollment.id;
          this.enrollService.unenroll(enrollmentId, userId).pipe(
            tap(() => {
              this.enrollService.deleteEnrollment(enrollmentId, userId).subscribe(() => {
                delete this.enrolledCourses[courseId];
              });
            })
          ).subscribe(() => {
            this.toastr.success('Unenrolled successfully!');
          });
        }
      });
    } else {
      this.enrollService.enroll(courseId, userId).subscribe(() => {
        this.enrolledCourses[courseId] = true;
        this.toastr.success('Enrolled successfully!');
      });
    }
  }
  
  public addNewCourse(newCourse: any) {
    if (this.courses && this.courses.length > 0) {
      this.courses.push(newCourse);
    }

    this.courseService.addCourse(newCourse).subscribe((response) => {
      console.log('New Course added:', response);
    });

    this.showAddCourseForm = false;
  }
  public openAddCourseDialog() {
    const dialogRef = this.dialog.open(AddCourseComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addNewCourse(result);
      }
    });
  }
  public removeCourse(courseId: number) {
    this.courseService.removeCourse(courseId).subscribe(() => {
      this.courses = this.courses.filter(course => course.id !== courseId);
      this.toastr.success('Course Removed successfully!');
    });
  }
}
