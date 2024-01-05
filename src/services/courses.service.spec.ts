import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(coursesService).toBeTruthy();
  });

  it('should get courses', () => {
    const mockCourses = [{ id: 1, name: 'Course A' }, { id: 2, name: 'Course B' }];

    coursesService.getCourses().subscribe((courses) => {
      expect(courses).toEqual(mockCourses);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toEqual('GET');

    req.flush(mockCourses);
    httpTestingController.verify();
  });

  it('should get total courses', () => {
    const mockCourses = [{ id: 1, name: 'Course A' }, { id: 2, name: 'Course B' }];

    const totalCourses = coursesService.getTotalCourses(mockCourses);
    expect(totalCourses).toEqual(2);
  });

  it('should get total free courses', () => {
    const mockCourses = [
      { id: 1, name: 'Course A', type: 'Free' },
      { id: 2, name: 'Course B', type: 'Premium' },
      { id: 3, name: 'Course C', type: 'Free' },
    ];

    const totalFreeCourses = coursesService.getTotalFreeCourses(mockCourses);
    expect(totalFreeCourses).toEqual(2);
  });

  it('should get total premium courses', () => {
    const mockCourses = [
      { id: 1, name: 'Course A', type: 'Free' },
      { id: 2, name: 'Course B', type: 'Premium' },
      { id: 3, name: 'Course C', type: 'Free' },
    ];

    const totalPremiumCourses = coursesService.getTotalPremiumCourses(mockCourses);
    expect(totalPremiumCourses).toEqual(1);
  });

  it('should add a course', () => {
    const mockNewCourse = { id: 3, name: 'Course C', type: 'Free' };

    coursesService.addCourse(mockNewCourse).subscribe();

    const req = httpTestingController.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockNewCourse);

    req.flush({});
    httpTestingController.verify();
  });

  it('should remove a course', () => {
    const mockCourseId = 1;

    coursesService.removeCourse(mockCourseId).subscribe();

    const req = httpTestingController.expectOne(`http://localhost:3000/courses/${mockCourseId}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({});
    httpTestingController.verify();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
