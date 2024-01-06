import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  const UserInfo = {
    id: 'johnDoe',
    name: 'John Doe',
    password: 'Password123',
    email: 'john.doe@example.com',
    gender: 'male',
    role: '', 
    isactive: false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('Registration', () => {
  it('should register a new user', () => {
    const UserData = { username: 'pjvpjv', name:'Pooja Verma' , password: 'Pooja@1234',email:'pj@gmail.com',gender:'Female'};

    authService.RegisterUser(UserData).subscribe(response => {
      expect(response).toEqual(UserInfo);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/user');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(UserData);

    req.flush(UserInfo);
  });
  it('should handle registration with strong password', () => {
    const strongPasswordUserData = { username: 'testuser', password: 'Strong@123' };
  
    authService.RegisterUser(strongPasswordUserData).subscribe(response => {
      expect(response).toEqual(UserInfo); 
    });
  
    const req = httpTestingController.expectOne(authService.apiurl);
    req.flush(UserInfo);
  });
  it('should handle registration with weak password', () => {
    const weakPasswordUserData = { username: 'testuser', password: 'weakpassword' };
  
    authService.RegisterUser(weakPasswordUserData).subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(400); 
        expect(error.error).toBeTruthy(); 
      }
    );
  
    const req = httpTestingController.expectOne(authService.apiurl);
    req.flush('Weak Password', { status: 400, statusText: 'Bad Request' });
  });
  it('should handle registration with invalid email', () => {
    const invalidEmailUserData = { username: 'testuser', password: 'strongpassword', email: 'ap.gmail.com' };
  
    authService.RegisterUser(invalidEmailUserData).subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(400);
        expect(error.error).toBeTruthy(); 
      }
    );
  
    const req = httpTestingController.expectOne(authService.apiurl);
    req.flush('Invalid Email', { status: 400, statusText: 'Bad Request' });
  });
  it('should handle registration with non-unique user ID', () => {
    const nonUniqueUserIdUserData = { username: 'pjvpjv', password: 'Strong@password', email: 'pjv@gmail.com' };
  
    authService.RegisterUser(nonUniqueUserIdUserData).subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(409); 
        expect(error.error).toBeTruthy(); 
      }
    );
  
    const req = httpTestingController.expectOne(authService.apiurl);
    req.flush('Non-Unique User ID', { status: 409, statusText: 'Conflict' });
  });
});
describe('User Retrieval', () => {
  it('should get user by code', () => {
    const UserId = 'pjv12';

    authService.GetUserbyCode(UserId).subscribe(response => {
      expect(response).toEqual(UserInfo);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/user/${UserId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(UserInfo);
  });
  it('should handle error when user is not found', () => {
    const userId = 'nonExistingUser';

    authService.GetUserbyCode(userId).subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(404); 
        expect(error.error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(`http://localhost:3000/user/${userId}`);
    req.flush('User Not Found', { status: 404, statusText: 'Not Found' });
    httpTestingController.verify();
  });
});

describe('Password Update', () => {
  it('should update password', () => {
    const userId = 'pjvpjv';
    const newPassword = 'New@Pass123';

    authService.updatePassword(userId, newPassword).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const url = `http://localhost:3000/user/${userId}/password`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual({ newPassword });

    req.flush({});
  });
  it('should handle error when updating password fails', () => {
    const userId = 'pjvpjv';
    const newPassword = 'New@Pass123';

    authService.updatePassword(userId, newPassword).subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(500); 
        expect(error.error).toBeTruthy(); 
      }
    );

    const url = `http://localhost:3000/user/${userId}/password`;
    const req = httpTestingController.expectOne(url);
    req.flush('Password Update Failed', { status: 500, statusText: 'Internal Server Error' });
    httpTestingController.verify();
  });
});

describe('Get and Update User', () => {
  it('should get all users', () => {
    authService.Getall().subscribe(response => {
      expect(response).toEqual(UserInfo);
    });

    const req = httpTestingController.expectOne(authService.apiurl);
    expect(req.request.method).toEqual('GET');

    req.flush(UserInfo);
  });
  it('should handle error when retrieving all users fails', () => {
    authService.Getall().subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(500); 
        expect(error.error).toBeTruthy(); 
      }
    );

    const req = httpTestingController.expectOne(authService.apiurl);
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
    httpTestingController.verify();
  });
  it('should update user successfully', () => {
    const userId = 'Pooja';
    const updatedUserData = {
      name: 'Pihu',
      password: 'Poo@12345',
      email: 'Pjv@gmail.com',
      gender: 'female'
    };

    authService.updateuser(userId, updatedUserData).subscribe(response => {
      expect(response).toEqual(UserInfo);
    });

    const url = `http://localhost:3000/user/${userId}`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(updatedUserData);

    req.flush(UserInfo);
  });
});

describe('User Role', () => {
 it('should get user role successfully', () => {
    const userRole='admin';
    authService.getuserrole().subscribe(response => {
      expect(response).toEqual(userRole);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/role');
    expect(req.request.method).toEqual('GET');

    req.flush(userRole);
  });
  it('should handle error when retrieving user role fails', () => {
    authService.getuserrole().subscribe(
      () => fail('Expected an error, but got a successful response'),
      error => {
        expect(error.status).toBe(500); 
        expect(error.error).toBeTruthy(); 
      }
    );

    const req = httpTestingController.expectOne('http://localhost:3000/role');
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
});

describe('User Authentication', () => {
  it('should return true if a user is logged in', () => {
    sessionStorage.setItem('username', 'pjvpjv');
    const isLoggedIn = authService.isloggedin();
    expect(isLoggedIn).toBe(true);
  });
  it('should return false if no user is logged in', () => {
    sessionStorage.clear();
    const isLoggedIn = authService.isloggedin();
    expect(isLoggedIn).toBe(false);
  });
  it('should return the user role if present in session storage', () => {
    const mockUserRole = 'admin';
    sessionStorage.setItem('role', mockUserRole);
    const userRole = authService.getrole();
    expect(userRole).toBe(mockUserRole);
  });
  it('should return an empty string if no user role is present in session storage', () => {
    sessionStorage.clear();
    const userRole = authService.getrole();
    expect(userRole).toBe('');
  });
});

  afterEach(() => {
    httpTestingController.verify();
  });
});
