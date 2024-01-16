import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent{
  public addCourseForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCourseComponent>,
    private formBuilder: FormBuilder
  ) {
    this.addCourseForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      duration: [0, Validators.required],
      type: ['Free', Validators.required],
      price: [0.00, Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  public submitForm() {
    if (this.addCourseForm.valid) {
      this.dialogRef.close(this.addCourseForm.value);
    }
  }

  public cancel() {
    this.dialogRef.close();
  }
}
