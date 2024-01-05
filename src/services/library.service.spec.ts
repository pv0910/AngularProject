import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LibraryService } from './library.service';

describe('LibraryService', () => {
  let libraryService: LibraryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LibraryService],
    });

    libraryService = TestBed.inject(LibraryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(libraryService).toBeTruthy();
  });

  it('should get library resources', () => {
    const mockResources = [{ id: 1, title: 'Resource A' }, { id: 2, title: 'Resource B' }];

    libraryService.getLibraryResources().subscribe((resources) => {
      expect(resources).toEqual(mockResources);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/resources');
    expect(req.request.method).toEqual('GET');

    req.flush(mockResources);
    httpTestingController.verify();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
