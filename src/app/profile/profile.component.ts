import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public profileForm = this.builder.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
    newPassword: ['', [
      Validators.minLength(8),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
    ]],
  });

  constructor(private builder: FormBuilder, private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('username');
    this.authService.GetUserbyCode(userId).subscribe((user) => {
      this.profileForm.patchValue(user);
    });
  }

  public updateProfile() {
    if (this.profileForm.valid) {
      const userId = sessionStorage.getItem('username');
      const updatedUser = { ...this.profileForm.value };
      delete updatedUser.newPassword;
      this.authService.updateuser(userId, updatedUser).subscribe(() => {
        this.toastr.success('Profile updated successfully');
      });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }

  public changePassword() {
    const newPassword = this.profileForm.get('newPassword')?.value;
    if (this.profileForm.get('newPassword')?.valid) {
      const userId = sessionStorage.getItem('username');
      this.authService.updateuser(userId, { password: newPassword }).subscribe(() => {
        this.toastr.success('Password changed successfully');
      });
    } else {
      this.toastr.warning('Please enter a new password.');
    }
  }
}
