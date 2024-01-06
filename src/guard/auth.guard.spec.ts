// import { TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { of } from 'rxjs';

// import { AuthGuard } from './auth.guard';
// import { AuthService } from '../services/auth.service';

// describe('AuthGuard', () => {
//   let guard: AuthGuard;
//   let authService: jasmine.SpyObj<AuthService>;
//   let router: Router;
//   let toastrService: jasmine.SpyObj<ToastrService>;

//   beforeEach(() => {
//     const authServiceSpy = jasmine.createSpyObj('AuthService', ['isloggedin', 'getrole']);
//     const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['warning']);

//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule],
//       providers: [
//         AuthGuard,
//         { provide: AuthService, useValue: authServiceSpy },
//         { provide: ToastrService, useValue: toastrServiceSpy },
//       ],
//     });

//     guard = TestBed.inject(AuthGuard);
//     authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
//     router = TestBed.inject(Router);
//     toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
//   });

//   it('should be created', () => {
//     expect(guard).toBeTruthy();
//   });
// });
