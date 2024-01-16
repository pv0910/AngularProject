import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { FormsModule } from '@angular/forms';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
  });

  it('should have default selected radio button value as "All"', () => {
    expect(component.selectedRadioButtonValue).toEqual('All');
  });

  it('should emit event when radio button selection changes', () => {
    spyOn(component.filterRadioButtonSelectionChanged, 'emit');
        component.selectedRadioButtonValue = 'Free';
    component.onRadioButtonSelectionChanged();

    expect(component.filterRadioButtonSelectionChanged.emit).toHaveBeenCalledWith('Free');
  });

  it('should update the selectedRadioButtonValue when radio button changes', () => {
    component.selectedRadioButtonValue = 'Premium';
    component.onRadioButtonSelectionChanged();

    expect(component.selectedRadioButtonValue).toEqual('Premium');
  });

  it('should render three radio buttons', () => {
    const radioButtons = fixture.nativeElement.querySelectorAll('input[type="radio"]');
    expect(radioButtons.length).toBe(3);
  });

  it('should emit "All" when the "All" radio button is selected', () => {
    spyOn(component.filterRadioButtonSelectionChanged, 'emit');

    component.selectedRadioButtonValue = 'All';
    component.onRadioButtonSelectionChanged();

    expect(component.filterRadioButtonSelectionChanged.emit).toHaveBeenCalledWith('All');
  });

  it('should emit "Free" when the "Free" radio button is selected', () => {
    spyOn(component.filterRadioButtonSelectionChanged, 'emit');

    component.selectedRadioButtonValue = 'Free';
    component.onRadioButtonSelectionChanged();

    expect(component.filterRadioButtonSelectionChanged.emit).toHaveBeenCalledWith('Free');
  });

  it('should emit "Premium" when the "Premium" radio button is selected', () => {
    spyOn(component.filterRadioButtonSelectionChanged, 'emit');

    component.selectedRadioButtonValue = 'Premium';
    component.onRadioButtonSelectionChanged();

    expect(component.filterRadioButtonSelectionChanged.emit).toHaveBeenCalledWith('Premium');
  });

  it('should display the correct label for "Premium Courses"', () => {
    component.premium = 3;
    fixture.detectChanges();

    const labelText = fixture.nativeElement.querySelector('.filter-container span:last-child').textContent;
    expect(labelText).toContain('Premium Courses(3)');
  });

  it('should have default values for all, free, and premium courses as 0', () => {
    expect(component.all).toEqual(0);
    expect(component.free).toEqual(0);
    expect(component.premium).toEqual(0);
  });

});
