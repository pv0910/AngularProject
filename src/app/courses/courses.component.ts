import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from 'src/services/courses.service';
import { AddCourseComponent } from './add-course/add-course.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  courseCountRadioButton: string = 'All';
  searchText: string = '';
  courses: any[] = []; 
  showAddCourseForm: boolean = false;
  isadmin=false;
  enrolledCourses: { [key: number]: boolean } = {};

  constructor(private courseService: CoursesService,
    private dialog: MatDialog,
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
  }

  getTotalCourses() {
    return this.courseService.getTotalCourses(this.courses);
  }

  getTotalFreeCourses() {
    return this.courseService.getTotalFreeCourses(this.courses);
  }

  getTotalPremiumCourses() {
    return this.courseService.getTotalPremiumCourses(this.courses);
  }

  onFilterRadioButtonChanged(data: string) {
    this.courseCountRadioButton = data;
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }
  toggleAddCourseForm() {
    this.showAddCourseForm = !this.showAddCourseForm;
  }
  toggleEnrollment(courseId: number) {
    this.enrolledCourses[courseId] = !this.enrolledCourses[courseId];
  }

  addNewCourse(newCourse: any) {
    if (this.courses && this.courses.length > 0) {
      this.courses.push(newCourse);
    }

    this.courseService.addCourse(newCourse).subscribe((response) => {
      console.log('New Course added:', response);
    });

    this.showAddCourseForm = false;
  }
  openAddCourseDialog() {
    const dialogRef = this.dialog.open(AddCourseComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addNewCourse(result);
      }
    });
  }
  removeCourse(courseId: number) {
    this.courseService.removeCourse(courseId).subscribe(() => {
      this.courses = this.courses.filter(course => course.id !== courseId);
      this.toastr.success('Course Removed successfully!');
    });
  }
}
