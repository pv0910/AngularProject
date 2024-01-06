import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LibraryService } from './library.service';

describe('LibraryService', () => {
  let libraryService: LibraryService;
  let httpTestingController: HttpTestingController;
  const mockResources = [
    {
      "id": 1,
      "title": "JavaScript: For Absolute Beginners",
      "type": "Book"
    },
    ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LibraryService],
    });

    libraryService = TestBed.inject(LibraryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should get library resources successfully', () => {
    libraryService.getLibraryResources().subscribe(response => {
      expect(response).toEqual(mockResources);
    });
  
    const req = httpTestingController.expectOne(`${libraryService.apiUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResources);
  });
  it('should handle error when fetching library resources fails', () => {
    libraryService.getLibraryResources().subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(500); 
      }
    );
  
    const req = httpTestingController.expectOne(`${libraryService.apiUrl}`);
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
  it('should handle empty response when no library resources are available', () => {
    libraryService.getLibraryResources().subscribe(response => {
      expect(response).toEqual([]);
    });
  
    const req = httpTestingController.expectOne(`${libraryService.apiUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush([]);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
});
