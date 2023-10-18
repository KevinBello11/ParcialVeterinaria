import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComidaComponent } from './form-comida.component';

describe('FormComidaComponent', () => {
  let component: FormComidaComponent;
  let fixture: ComponentFixture<FormComidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormComidaComponent]
    });
    fixture = TestBed.createComponent(FormComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
