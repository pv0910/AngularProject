import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/services/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  course: any;
  courseId: any;

  constructor(private service: CoursesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');

    this.service.getCourses().subscribe((courses) => {
      this.course = courses.find((x) => x.id == this.courseId);
    });
  }
}
