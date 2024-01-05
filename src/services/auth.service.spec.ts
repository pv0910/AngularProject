import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should register a user', () => {
    const mockUserData = { username: 'testuser', password: 'testpassword' };

    authService.RegisterUser(mockUserData).subscribe();

    const req = httpTestingController.expectOne('http://localhost:3000/user');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockUserData);

    req.flush({});
    httpTestingController.verify();
  });

  it('should get user by code', () => {
    const mockUserId = '123';

    authService.GetUserbyCode(mockUserId).subscribe();

    const req = httpTestingController.expectOne(`http://localhost:3000/user/${mockUserId}`);
    expect(req.request.method).toEqual('GET');

    req.flush({});
    httpTestingController.verify();
  });

  it('should update password', () => {
    const mockUserId = '123';
    const mockNewPassword = 'newpassword';

    authService.updatePassword(mockUserId, mockNewPassword).subscribe();

    const req = httpTestingController.expectOne(`http://localhost:3000/user/${mockUserId}/password`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual({ newPassword: mockNewPassword });

    req.flush({});
    httpTestingController.verify();
  });

  it('should get all users', () => {
    authService.Getall().subscribe();

    const req = httpTestingController.expectOne('http://localhost:3000/user');
    expect(req.request.method).toEqual('GET');

    req.flush({});
    httpTestingController.verify();
  });

  it('should update user', () => {
    const mockUserId = '123';
    const mockUserData = { username: 'updateduser' };

    authService.updateuser(mockUserId, mockUserData).subscribe();

    const req = httpTestingController.expectOne(`http://localhost:3000/user/${mockUserId}`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(mockUserData);

    req.flush({});
    httpTestingController.verify();
  });

  it('should get user role', () => {
    authService.getuserrole().subscribe();

    const req = httpTestingController.expectOne('http://localhost:3000/role');
    expect(req.request.method).toEqual('GET');

    req.flush({});
    httpTestingController.verify();
  });

  it('should check if user is logged in', () => {
    const isLoggedIn = authService.isloggedin();
    expect(isLoggedIn).toBeFalsy(); // You may need to set sessionStorage data for a logged-in state

    // No HTTP request to test for here
  });

  it('should get user role from sessionStorage', () => {
    // You may need to set sessionStorage data for this test
    sessionStorage.setItem('role', 'admin');

    const userRole = authService.getrole();
    expect(userRole).toEqual('admin');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
