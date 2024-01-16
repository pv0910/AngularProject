import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from 'src/material.module';
import { of } from 'rxjs';
import { ProfileComponent } from './profile.component';
import { AuthService } from '../../../services/auth.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['GetUserbyCode', 'updateuser']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'warning']);

    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [ReactiveFormsModule,MaterialModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should initialize form and fetch user data', () => {
    const dummyUser = { id: '1', name: 'Pooja', email: 'pjv@gmail.com', gender: 'female', newPassword: ''};
    authService.GetUserbyCode.and.returnValue(of(dummyUser));

    component.ngOnInit();

    expect(component.profileForm.value).toEqual(dummyUser);
  });

  it('should update profile when form is valid', () => {
    const dummyUser = { id: '1', name: 'John Doe', email: 'john@example.com', gender: 'male' };
    authService.GetUserbyCode.and.returnValue(of(dummyUser));
    authService.updateuser.and.returnValue(of({}));
  
    component.ngOnInit();
    component.profileForm.patchValue({ name: 'Updated Name' });
    spyOn(sessionStorage, 'getItem').and.returnValue('1');
  
    component.updateProfile();
  
    expect(authService.updateuser).toHaveBeenCalledWith('1', jasmine.objectContaining({ name: 'Updated Name' }));
    expect(toastrService.success).toHaveBeenCalledWith('Profile updated successfully');
  });

  it('should show warning when updating profile with invalid form', () => {
    component.updateProfile();

    expect(authService.updateuser).not.toHaveBeenCalled();
    expect(toastrService.warning).toHaveBeenCalledWith('Please enter valid data.');
  });
 
  it('should change password when form is valid', () => {
    const newPassword = 'Password@123';
    spyOn(sessionStorage, 'getItem').and.returnValue('username');
    authService.updateuser.and.returnValue(of({}));
  
    component.profileForm.patchValue({ newPassword });
    component.changePassword();
  
    expect(authService.updateuser).toHaveBeenCalledWith('username', jasmine.objectContaining({ password: newPassword }));
    expect(toastrService.success).toHaveBeenCalledWith('Password changed successfully');
  });
  it('should call updateProfile method on form submission', () => {
    spyOn(component, 'updateProfile');
    component.profileForm.setValue({
      id: 'pjvpjv',
      name: 'Pooja',
      email: 'pj@gmail.com',
      gender: 'female',
      newPassword: 'Password@123',
    });

    component.updateProfile();
    expect(component.updateProfile).toHaveBeenCalled();
  });

});
