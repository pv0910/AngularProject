import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContentManagementService } from './content-management.service';

describe('ContentManagementService', () => {
  let contentService: ContentManagementService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContentManagementService]
    });

    contentService = TestBed.inject(ContentManagementService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(contentService).toBeTruthy();
  });

  it('should create content', () => {
    const mockContentData = { /* your content data */ };

    contentService.createContent(mockContentData).subscribe();

    const req = httpTestingController.expectOne('http://localhost:3000/content');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockContentData);

    req.flush({});
    httpTestingController.verify();
  });

  it('should update content', () => {
    const mockContentId = '123';
    const mockUpdatedContent = { /* your updated content data */ };

    contentService.updateContent(mockContentId, mockUpdatedContent).subscribe();

    const req = httpTestingController.expectOne(`http://localhost:3000/content/${mockContentId}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(mockUpdatedContent);

    req.flush({});
    httpTestingController.verify();
  });

  it('should get all content', () => {
    contentService.getAllContent().subscribe();

    const req = httpTestingController.expectOne('http://localhost:3000/content');
    expect(req.request.method).toEqual('GET');

    req.flush({});
    httpTestingController.verify();
  });

  it('should delete content by id', () => {
    const mockContentId = '123';

    contentService.deleteContentById(mockContentId).subscribe();

    const req = httpTestingController.expectOne(`http://localhost:3000/content/${mockContentId}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({});
    httpTestingController.verify();
  });

  it('should get content by course id', () => {
    const mockCourseId = 456;

    contentService.getContentByCourseId(mockCourseId).subscribe();

    const req = httpTestingController.expectOne(`http://localhost:3000/content?courseId=${mockCourseId}`);
    expect(req.request.method).toEqual('GET');

    req.flush({});
    httpTestingController.verify();
  });

  it('should get content details by content id', () => {
    const mockContentId = 789;

    contentService.getContentDetails(mockContentId).subscribe();

    const req = httpTestingController.expectOne(`http://localhost:3000/content/${mockContentId}`);
    expect(req.request.method).toEqual('GET');

    req.flush({});
    httpTestingController.verify();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
