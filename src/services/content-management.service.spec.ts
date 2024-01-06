import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContentManagementService } from './content-management.service';

describe('ContentManagementService', () => {
  let contentService: ContentManagementService;
  let httpTestingController: HttpTestingController;
  const mockContentData = [{ title: 'Lecture 1', type: 'Lecture1', courseId: 101, contentDetails: 'Content details....', file: 'lecture1.pdf' }];
  const mockUpdatedContent = { title: 'Updated Lecture 1', type: 'UpdatedLecture1', courseId: 101, contentDetails: 'Updated Content details....', file: 'updated_lecture1.pdf' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContentManagementService]
    });

    contentService = TestBed.inject(ContentManagementService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('Create Content', () => {
  it('should create content successfully', () => {
    contentService.createContent(mockContentData).subscribe(response => {
      expect(response).toBeTruthy();
    });
    const req = httpTestingController.expectOne(`${contentService.apiUrl}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockContentData);
    req.flush({});
  });
  it('should handle error when creating content fails', () => {
    contentService.createContent(mockContentData).subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(500); 
      }
    );
    const req = httpTestingController.expectOne(`${contentService.apiUrl}`);
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
});

describe('Update Content', () => {
  it('should update content successfully', () => {
    const contentId = '1';  
    contentService.updateContent(contentId, mockUpdatedContent).subscribe(response => {
      expect(response).toBeTruthy();
    });
  
    const req = httpTestingController.expectOne(`${contentService.apiUrl}/${contentId}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(mockUpdatedContent);
    req.flush({});
  });
  it('should handle error when updating content fails', () => {
    const contentId = '1';
    contentService.updateContent(contentId, mockUpdatedContent).subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(500);
      }
    );
    const req = httpTestingController.expectOne(`${contentService.apiUrl}/${contentId}`);
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
});
  describe('Retrieve all Content', () => {
  it('should get all content successfully', () => {
    contentService.getAllContent().subscribe(response => {
      expect(response).toEqual(mockContentData);
    });
  
    const req = httpTestingController.expectOne(`${contentService.apiUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockContentData);
  });
  it('should handle error when retrieving all content fails', () => {
    contentService.getAllContent().subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(500);
      }
    );
  
    const req = httpTestingController.expectOne(`${contentService.apiUrl}`);
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
  it('should handle empty content response', () => {
    contentService.getAllContent().subscribe(response => {
      expect(response).toEqual([]);
    });
  
    const req = httpTestingController.expectOne(`${contentService.apiUrl}`);
    req.flush([]);
  });
});

describe('Delete Content', () => {
  it('should delete content successfully', () => {
    const contentId = '1';
    contentService.deleteContentById(contentId).subscribe(response => {
      expect(response).toBeTruthy();
    });
  
    const req = httpTestingController.expectOne(`${contentService.apiUrl}/${contentId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
  it('should handle error when deleting content fails', () => {
    const contentId = '2';
    contentService.deleteContentById(contentId).subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(500); 
      }
    );
  
    const req = httpTestingController.expectOne(`${contentService.apiUrl}/${contentId}`);
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
  it('should handle 404 error when content to be deleted is not found', () => {
    const contentId = '3';
  
    contentService.deleteContentById(contentId).subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(404); // Customize the status code as needed
      }
    );
  
    const req = httpTestingController.expectOne(`${contentService.apiUrl}/${contentId}`);
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });
});

describe('Get Content by CourseID', () => {
  it('should get content by course ID successfully', () => {
    const courseId = 101;
    contentService.getContentByCourseId(courseId).subscribe(response => {
      expect(response).toEqual(mockContentData);
    });
  
    const req = httpTestingController.expectOne(`${contentService.apiUrl}?courseId=${courseId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockContentData);
  });
  it('should handle error when fetching content by course ID fails', () => {
    const courseId = 102;
    contentService.getContentByCourseId(courseId).subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(500); 
      }
    );
    const req = httpTestingController.expectOne(`${contentService.apiUrl}?courseId=${courseId}`);
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
  it('should handle 404 error when content for course ID is not found', () => {
    const courseId = 103;
    contentService.getContentByCourseId(courseId).subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(404); 
      }
    );
    const req = httpTestingController.expectOne(`${contentService.apiUrl}?courseId=${courseId}`);
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });
});
  
describe('Get Content Details by ContentID', () => {
  it('should get content details by content ID successfully', () => {
    const contentId = 1;
    contentService.getContentDetails(contentId).subscribe(response => {
      expect(response).toEqual(mockContentData[0]);
    });
    const req = httpTestingController.expectOne(`${contentService.apiUrl}/${contentId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockContentData[0]);
  });
  it('should handle error when fetching content details by ID fails', () => {
    const contentId = 2;
    contentService.getContentDetails(contentId).subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(500); 
      }
    );
  
    const req = httpTestingController.expectOne(`${contentService.apiUrl}/${contentId}`);
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
});

  afterEach(() => {
    httpTestingController.verify();
  });
});
