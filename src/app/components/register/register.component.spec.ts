// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { RegisterComponent } from './register.component';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AuthService } from '../../../services/auth.service';
// import { ToastrService } from 'ngx-toastr';
// import { MaterialModule } from 'src/material.module';

// describe('RegisterComponent', () => {
//   let component: RegisterComponent;
//   let fixture: ComponentFixture<RegisterComponent>;
//   let authService: jasmine.SpyObj<AuthService>;
//   let toastrService: jasmine.SpyObj<ToastrService>;

//   beforeEach(waitForAsync(() => {
//     authService = jasmine.createSpyObj('AuthService', ['RegisterUser']);
//     toastrService = jasmine.createSpyObj('ToastrService', ['success', 'warning']);

//     TestBed.configureTestingModule({
//       declarations: [RegisterComponent],
//       imports: [ReactiveFormsModule, RouterTestingModule,MaterialModule],
//       providers: [
//         FormBuilder,
//         { provide: AuthService, useValue: authService },
//         { provide: ToastrService, useValue: toastrService }
//       ],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(RegisterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should display username error messages', () => {
//     component.registerform.controls['id'].setValue('');
//     component.registerform.controls['id'].markAsTouched();
//     fixture.detectChanges();
//     const errorMessage = fixture.nativeElement.querySelector('.error-message');
//     expect(errorMessage.textContent).toContain('Username is required');
//   });

//   it('should display name error messages', () => {
//     component.registerform.controls['name'].setValue('');
//     component.registerform.controls['name'].markAsTouched();
//     fixture.detectChanges();
//     const errorMessage = fixture.nativeElement.querySelector('.error-message');
//     expect(errorMessage.textContent).toContain('Name is required');
//   });

//   it('should display password error messages', () => {
//     component.registerform.controls['password'].setValue('');
//     component.registerform.controls['password'].markAsTouched();
//     fixture.detectChanges();
//     const errorMessage = fixture.nativeElement.querySelector('.error-message');
//     expect(errorMessage.textContent).toContain('Password is required');
//   });

//   it('should display email error messages', () => {
//     component.registerform.controls['email'].setValue('');
//     component.registerform.controls['email'].markAsTouched();
//     fixture.detectChanges();
//     const errorMessage = fixture.nativeElement.querySelector('.error-message');
//     expect(errorMessage.textContent).toContain('Email is required');
//   });

//   it('should show warning toastr if form is invalid on form submission', () => {
//     const warningSpy = spyOn(toastrService, 'warning');
//     component.proceedregister();
//     expect(warningSpy).toHaveBeenCalledOnceWith('Please enter valid data.');
//   });

// });
