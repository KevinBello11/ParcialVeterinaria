import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComidasComponent } from './form-comidas.component';

describe('FormComidasComponent', () => {
  let component: FormComidasComponent;
  let fixture: ComponentFixture<FormComidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormComidasComponent]
    });
    fixture = TestBed.createComponent(FormComidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
