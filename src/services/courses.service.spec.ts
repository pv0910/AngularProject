import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController;
  const mockCourses = [
    {
      "id": 101,
      "name": "Javascript for beginners",
      "author": "John Heikela",
      "duration": 48,
      "type": "Free",
      "price": 0,
      "image": "assets/jsforbeginners.jpeg",
      "description": "`In this course, you will learn the fundamentals of JavaScript. This course is purely designed for beginners.`"
    },
    {
      "id": 102,
      "name": "Javascript for beginners",
      "author": "John Heikela",
      "duration": 48,
      "type": "Premium",
      "price": 0,
      "image": "assets/jsforbeginners.jpeg",
      "description": "`In this course, you will learn the fundamentals of JavaScript. This course is purely designed for beginners.`"
    }
  ];

  const mockCourseToAdd = {
    id: 103,
    name: 'Data Science Essentials',
    author: 'Michael Smith',
    duration: 75,
    type: 'Premium',
    price: 49.99,
    image: 'assets/dataScience.jpeg',
    description: 'Learn the essential concepts and tools of data science for analysis and visualization.',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('Retrieve Courses', () => {
  it('should retrieve courses successfully', () => {
    coursesService.getCourses().subscribe((courses) => {
      expect(courses).toEqual(mockCourses);
    });
    const req = httpTestingController.expectOne(coursesService.apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockCourses);
  });
  it('should handle empty courses response', () => {
    coursesService.getCourses().subscribe((courses) => {
      expect(courses).toEqual([]);
    });
    const req = httpTestingController.expectOne(coursesService.apiUrl);
    req.flush([]);
  });
});

describe('Retrieve Total no. of Courses', () => {
  it('should return 0 for an empty courses array', () => {
    const totalCourses = coursesService.getTotalCourses([]);
    expect(totalCourses).toBe(0);
  });

  it('should return the total number of courses', () => {
    const totalCourses = coursesService.getTotalCourses(mockCourses);
    expect(totalCourses).toBe(mockCourses.length);
  });
});
 
describe('Retrieve Total no. of free Courses', () => {
  it('should return 0 for an empty courses array', () => {
    const totalFreeCourses = coursesService.getTotalFreeCourses([]);
    expect(totalFreeCourses).toBe(0);
  });

  it('should return the total number of free courses', () => {
    const totalFreeCourses = coursesService.getTotalFreeCourses(mockCourses);
    expect(totalFreeCourses).toBe(1); // Assuming only one course is free in the mockCourses array
  });

  it('should handle scenarios with no free courses', () => {
    const coursesWithNoFree = mockCourses.filter(course => course.type !== 'Free');
    const totalFreeCourses = coursesService.getTotalFreeCourses(coursesWithNoFree);
    expect(totalFreeCourses).toBe(0);
  });
});

describe('Retrieve Total no. of Premium Courses', () => {
  it('should return 0 for an empty courses array', () => {
    const totalPremiumCourses = coursesService.getTotalPremiumCourses([]);
    expect(totalPremiumCourses).toBe(0);
  });

  it('should return the total number of premium courses', () => {
    const totalPremiumCourses = coursesService.getTotalPremiumCourses(mockCourses);
    expect(totalPremiumCourses).toBe(1); 
  });

  it('should handle scenarios with no premium courses', () => {
    const coursesWithNoPremium = mockCourses.filter(course => course.type !== 'Premium');
    const totalPremiumCourses = coursesService.getTotalPremiumCourses(coursesWithNoPremium);
    expect(totalPremiumCourses).toBe(0);
  });
});

describe('Add new Course', () => {
  it('should add a new course successfully', () => {
    coursesService.addCourse(mockCourseToAdd).subscribe(response => {
      expect(response).toEqual(mockCourseToAdd);
    });

    const req = httpTestingController.expectOne(coursesService.apiUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockCourseToAdd);

    req.flush(mockCourseToAdd);
  });
  it('should handle error when adding a course fails', () => {
    const errorMessage = 'Error adding course';
    coursesService.addCourse(mockCourseToAdd).subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(500);
        expect(error.error).toEqual(errorMessage);
      }
    );

    const req = httpTestingController.expectOne(coursesService.apiUrl);
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});

describe('To remove Course', () => {
  it('should remove a course successfully', () => {
    coursesService.removeCourse(101).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const url = `${coursesService.apiUrl}/${101}`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('DELETE');

    req.flush({}); 
  });

  it('should handle error when removing a course fails', () => {
    const errorMessage = 'Error removing course';
    coursesService.removeCourse(101).subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(500);
        expect(error.error).toEqual(errorMessage);
      }
    );

    const url = `${coursesService.apiUrl}/${101}`;
    const req = httpTestingController.expectOne(url);
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});

  afterEach(() => {
    httpTestingController.verify();
  });
});
