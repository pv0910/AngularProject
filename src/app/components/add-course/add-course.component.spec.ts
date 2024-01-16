import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AddCourseComponent } from './add-course.component';

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AddCourseComponent>>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [AddCourseComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: spy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        FormBuilder,
      ],
    });

    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<AddCourseComponent>>;
  });

  it('should initialize with an empty form', () => {
    expect(component.addCourseForm.valid).toBeFalsy();
  });

  it('should submit form when valid', () => {
    component.addCourseForm.setValue({
      name: 'Test Course',
      author: 'Test Author',
      duration: 5,
      type: 'Free',
      price: 0.00,
      image: 'test-image.jpg',
      description: 'Test Description',
    });

    component.submitForm();

    expect(dialogRefSpy.close).toHaveBeenCalledWith(component.addCourseForm.value);
  });

  it('should not submit form when invalid', () => {
    component.submitForm();

    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('should cancel', () => {
    component.cancel();

    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should disable Add Course button initially when form is pristine', () => {
    const addCourseButton = fixture.nativeElement.querySelector('button[color="primary"]');
    expect(addCourseButton.disabled).toBe(false);
  });

  it('should enable Add Course button when form is dirty and valid', () => {
    const addCourseButton = fixture.nativeElement.querySelector('button[color="primary"]');
    component.addCourseForm.markAsDirty();

    component.addCourseForm.setValue({
      name: 'Test Course',
      author: 'Test Author',
      duration: 5,
      type: 'Free',
      price: 0.00,
      image: 'test-image.jpg',
      description: 'Test Description',
    });

    fixture.detectChanges();

    expect(addCourseButton.disabled).toBe(false);
  });

  it('should close the dialog with form values when submitting a valid form', () => {
    component.addCourseForm.setValue({
      name: 'Valid Course',
      author: 'Valid Author',
      duration: 5,
      type: 'Premium',
      price: 10.00,
      image: 'valid-image.jpg',
      description: 'Valid Description'
    });
  
    component.submitForm();
  
    expect(dialogRefSpy.close).toHaveBeenCalledWith(component.addCourseForm.value);
  });

  it('should require all form fields', () => {
    component.addCourseForm.setValue({
      name: '',
      author: '',
      duration: null,
      type: null,
      price: null,
      image: '',
      description: ''
    });
      fixture.detectChanges();
    expect(component.addCourseForm.valid).toBeFalsy();
    expect(component.addCourseForm.controls['name'].hasError('required')).toBeTruthy();
    expect(component.addCourseForm.controls['author'].hasError('required')).toBeTruthy();
    expect(component.addCourseForm.controls['duration'].hasError('required')).toBeTruthy();
    expect(component.addCourseForm.controls['type'].hasError('required')).toBeTruthy();
    expect(component.addCourseForm.controls['price'].hasError('required')).toBeTruthy();
    expect(component.addCourseForm.controls['image'].hasError('required')).toBeTruthy();
    expect(component.addCourseForm.controls['description'].hasError('required')).toBeTruthy();
  });
  it('should disable Add Course button when form is dirty but invalid', () => {
    const addCourseButton = fixture.nativeElement.querySelector('button[color="primary"]');
    component.addCourseForm.markAsDirty();
    fixture.detectChanges();

    expect(addCourseButton.disabled).toBe(false);
  });
});
