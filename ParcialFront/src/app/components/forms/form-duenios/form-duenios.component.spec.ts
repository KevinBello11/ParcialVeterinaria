import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDueniosComponent } from './form-duenios.component';

describe('FormDueniosComponent', () => {
  let component: FormDueniosComponent;
  let fixture: ComponentFixture<FormDueniosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDueniosComponent]
    });
    fixture = TestBed.createComponent(FormDueniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
